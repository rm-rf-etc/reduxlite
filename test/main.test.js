import * as redux from "redux";
const testTarget = process.env.JEST_TEST_TARGET;
console.log(`Running tests against target ${testTarget || 'project root source'}`);
const reduxlite = require(testTarget || "..");

const _100_000 = 100000;
const _50_000_000 = 50000000;
const _100_000_000 = 100000000;

function testRawJSPerformance(times) {
	describe.skip(`JS Performance over ${(times).toLocaleString()} repetitions`, () => {
		const actionType = "SOME_ACTION_TYPE";
		let string = "?";
		let intrvl;
		let num;
		const state = {
			some_prop: {
				correct_path: 1,
			},
		};
		intrvl = setInterval(() => {
			string = Math.random().toString().split(".")[1];
		}, 0);
		it(`time required to compare strings ${(times).toLocaleString()} times`, () => {
			for (let i = 0; i < times; i++) {
				if (string === actionType) {
					num = i;
				}
			}
			expect(num).toEqual(undefined);
		});
		it(`time required to lookup object properties ${(times).toLocaleString()} times`, () => {
			for (let i = 0; i < times; i++) {
				try {
					num = state.some_prop[string];
				} catch (_) {}
			}
			expect(num).toEqual(undefined);
		});
		it(`time required to lookup object properties ${(times).toLocaleString()} times`, () => {
			for (let i = 0; i < times; i++) {
				try {
					num = state.some_prop.correct_path;
				} catch (_) {}
			}
			expect(num).toEqual(1);
		});
		afterAll(() => clearInterval(intrvl));
	});
}
testRawJSPerformance(_100_000);
testRawJSPerformance(_50_000_000);
testRawJSPerformance(_100_000_000);

describe("Redux Performance", () => {
	const reducer = (oldState = { thing1: 1 }, action = {}) => {
		return {
			...oldState,
			a: {
				thing1: action.value + 1,
				thing2: -(action.value + 1),
			},
		};
	};
	const store = redux.createStore(reducer, {
		a: {
			thing1: 1,
			thing2: -1,
			thing3: "ignored",
		},
		b: {
			ignored: "asdf",
		},
	});

	it(`run dispatch ${(_100_000).toLocaleString()} times`, (done) => {
		store.subscribe(() => {
			const state = store.getState();
			if (state && state.a.thing1 === _100_000) done();
		});
		for (var i = 0; i < _100_000; i++) {
			store.dispatch({ type: "A", value: i });
		}
	});
});

describe("ReduxLite Performance", () => {
	let store = reduxlite.createStore({
		a: [
			{
				thing1: 1,
				thing2: -1,
				thing3: "ignored",
			},
		],
		b: {
			ignored: "asdf",
		},
	});

	it(`run dispatch ${(_100_000).toLocaleString()} times`, (done) => {
		store.watch((state) => state.a[0], (state) => {
			if (state.thing1 === _100_000) {
				done();
			}
		});
		for (var i = 0; i < _100_000; i++) {
			store.dispatch({
				a: [
					{
						thing1: i+1,
						thing2: -(i+1),
					},
				],
			});
		}
	});
});

describe("createStore", () => {
	let store = {};

	beforeEach(() => {
		store = reduxlite.createStore({
			friends: {
				"1": {
					name: "Alice",
					age: 25,
				},
				"2": {
					name: "Bob",
					age: 28,
				},
			}
		});
	});

	it("dispatch invokes listeners", () => {
		const spy1 = jest.fn();
		const spy2 = jest.fn();
		store.watch((state) => state.friends["1"].name, spy1);
		store.watch((state) => state.friends["1"].name, spy2);
		store.dispatch({
			friends: {
				"1": {
					name: "Carrol",
				},
			},
		});
		expect(spy1).toHaveBeenCalled();
		expect(spy2).toHaveBeenCalled();
	});

	it("should throw when attempting to reuse existing selector", () => {
		const selector = (state) => state.friends["1"];

		expect(() => {
			store.watch(selector, console.log);
			store.watch(selector, console.log);
		}).toThrow();

		expect(store.watch((state) => state.friends["1"], console.log)).toEqual({
			name: "Alice",
			age: 25,
		});
		expect(store.watch((state) => state.friends["1"], console.log)).toEqual({
			name: "Alice",
			age: 25,
		});
	});

	it("can unwatch previously watched", () => {
		const spy1 = jest.fn();
		const selector = (state) => state.friends["1"].name;
		store.watch(selector, spy1);
		store.dispatch({
			friends: {
				"1": {
					name: "Carrol",
				},
			},
		});
		store.dispatch({
			friends: {
				"1": {
					name: "Susan",
				},
			},
		});
		store.dispatch({
			friends: {
				"1": {
					name: "Dianne",
				},
			},
		});
		store.unwatch(selector, spy1);
		store.dispatch({
			friends: {
				"1": {
					name: "Edward",
				},
			},
		});
		expect(spy1.mock.calls).toEqual([
			["Carrol"],
			["Susan"],
			["Dianne"],
		]);
	});

	it("emits nested objects for selectors having a partial path", () => {
		const spy1 = jest.fn();
		const spy2 = jest.fn();
		const spy3 = jest.fn();
		store.watch((state) => state.friends, spy1);
		store.watch((state) => state.friends["1"], spy2);
		store.watch((state) => state.friends["1"].name, spy3);
		store.dispatch({
			friends: {
				"1": {
					name: "Carrol",
				},
			},
		});
		expect(spy1.mock.calls).toEqual([[{
			"1": {
				name: "Carrol",
				age: 25,
			},
			"2": {
				name: "Bob",
				age: 28,
			},
		}]]);
		expect(spy2.mock.calls).toEqual([[{
			name: "Carrol",
			age: 25,
		}]]);
		expect(spy3.mock.calls).toEqual([[
			"Carrol",
		]]);
	});

	it("can remove items from arrays", () => {
		const spy1 = jest.fn();
		store.watch((state) => state.friends, spy1);
		store.dispatch({
			friends: {
				"1": {
					name: "Susan",
					age: 25,
				},
				"2": reduxlite.deleted,
			},
		});
		expect(spy1.mock.calls).toEqual([[{
			"1": {
				name: "Susan",
				age: 25,
			},
		}]]);
		expect(store.getState().friends["2"]).toEqual(undefined);
	});

	it("can remove items from objects", () => {
		const spy1 = jest.fn();
		store.watch((state) => state.friends, spy1);
		store.dispatch({
			friends: {
				"1": {
					name: "Susan",
					age: reduxlite.deleted,
				},
				"2": {
					age: reduxlite.deleted,
				},
			},
		});
		expect(spy1.mock.calls).toEqual([[{
			"1": {
				name: "Susan",
			},
			"2": {
				name: "Bob",
			},
		}]]);
		expect(store.getState().friends["1"]).toEqual({
			name: "Susan",
		});
		expect(store.getState().friends["2"]).toEqual({
			name: "Bob",
		});
	});
});

describe("simpleMerge", () => {
	let state;
	const target = {
		a: [
			{ thing: 1 },
			{ thing: 2 },
		],
		b: {
			asdf1: "!",
			asdf2: 0,
			bool: false,
		},
	};
	beforeEach(() => {
		state = { ...target };
	})

	it("can update simple values in objects in arrays", () => {
		const change = {
			a: reduxlite.partialArray(1, { thing: 3 }),
		};
		expect(change.a[1].thing).toEqual(3);
		expect(target.a[1].thing).toEqual(2);

		reduxlite.simpleMerge(state, change);
		expect(state.a[1].thing).toEqual(3);
	});

	it("can change simple values to other data types inside nested objects", () => {
		reduxlite.simpleMerge(state, {
			b: {
				bool: "true",
			},
		});
		expect(state.b.bool).toEqual("true");
	});

	it("can replace simple values in arrays with new objects", () => {
		reduxlite.simpleMerge(state, {
			a: reduxlite.partialArray(1, {
				thing: {
					new_thing: 1,
				},
			}),
		});
		expect(state.a[1].thing).toEqual({ new_thing: 1 });
	});

	it("can append new items to arrays", () => {
		reduxlite.simpleMerge(state, {
			a: reduxlite.partialArray(2, {
				thing: "was added",
			}),
		});
		expect(state.a[2]).toEqual({ thing: "was added" });
	});

	it("doesn't fail on null values", () => {
		reduxlite.simpleMerge(state, {
			a: reduxlite.partialArray(1, null),
		});
		expect(state.a[1]).toEqual(null);
	});

	it("doesn't fail for values of 0", () => {
		reduxlite.simpleMerge(state, {
			a: 0,
			b: {
				asdf1: 0,
				asdf2: {
					stuff: "stuff",
				},
			},
		});
		expect(state.a).toEqual(0);
		expect(state.b.asdf1).toEqual(0);
		expect(state.b.asdf2).toEqual({ stuff: "stuff" });
	});
});