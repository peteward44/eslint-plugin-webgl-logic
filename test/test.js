"use strict";

var noAsyncAwait = require( "../rules/noAsyncAwait.js" );
var noMathRandom = require( "../rules/noMathRandom.js" );
var noPromiseAll = require( "../rules/noPromiseAll.js" );
var noPromiseRace = require( "../rules/noPromiseRace.js" );
var noSetTimeout = require( "../rules/noSetTimeout.js" );
var RuleTester = require( "eslint" ).RuleTester;

var ruleTester = new RuleTester();

ruleTester.run( "noAsyncAwait", noAsyncAwait, {
    valid: [
        "function name() { var monkey = 33; }"
    ],

    invalid: [
        {
            code: "async function name() {}",
            parser: 'babel-eslint',
            errors: [{ message: "Async/Await is forbidden" }]
        },
        {
            code: "async () => {}",
            parser: 'babel-eslint',
            errors: [{ message: "Async/Await is forbidden" }]
        },
        {
            code: "async function name() { await waitOnFunction(); }",
            parser: 'babel-eslint',
            errors: [{ message: "Async/Await is forbidden" }]
        }
    ]
} );

ruleTester.run( "noMathRandom", noMathRandom, {
    valid: [
        "function name() { Math.floor( 4.5 ); }",
        "var val = Math2.random();",
        "var val = Math.random2();",
        "var val = _.shuffle1();",
        "var val = _.sample1();",
        "var val = __.shuffle();",
        "var val = lodush.sbuffle();",
        "var val = _.random_()"
    ],

    invalid: [
        {
            code: "function name() { var num = Math.random(); }",
            errors: [{ message: "Math.Random is forbidden" }]
        },
        {
            code: "var funcptr = Math.random;",
            errors: [{ message: "Math.Random is forbidden" }]
        },
        {
            code: "function name() { var num = _.shuffle(); }",
            errors: [{ message: "_.shuffle is forbidden as it uses Math.Random" }]
        },
        {
            code: "var funcptr = _.shuffle;",
            errors: [{ message: "_.shuffle is forbidden as it uses Math.Random" }]
        },
        {
            code: "function name() { var num = lodash.shuffle(); }",
            errors: [{ message: "_.shuffle is forbidden as it uses Math.Random" }]
        },
        {
            code: "var funcptr = lodash.shuffle;",
            errors: [{ message: "_.shuffle is forbidden as it uses Math.Random" }]
        },
        {
            code: "function name() { var num = lodash.sample(); }",
            errors: [{ message: "_.sample is forbidden as it uses Math.Random" }]
        },
        {
            code: "var funcptr = lodash.sample;",
            errors: [{ message: "_.sample is forbidden as it uses Math.Random" }]
        },
        {
            code: "function name() { var num = lodash.sampleSize(); }",
            errors: [{ message: "_.sampleSize is forbidden as it uses Math.Random" }]
        },
        {
            code: "var funcptr = lodash.sampleSize;",
            errors: [{ message: "_.sampleSize is forbidden as it uses Math.Random" }]
        },
        {
            code: "function name() { var num = lodash.random(); }",
            errors: [{ message: "_.random is forbidden as it uses Math.Random" }]
        },
        {
            code: "var funcptr = lodash.random;",
            errors: [{ message: "_.random is forbidden as it uses Math.Random" }]
        }
    ]
} );

ruleTester.run( "noPromiseAll", noPromiseAll, {
    valid: [
        "function prom() { return Promise.resolve(); }",
        "function prom() { return Promise.reject(); }",
        "Promise.someOtherProperty = {};",
        "var val = new Promise( function( res, rej ) { return 0; } );"
    ],

    invalid: [
        {
            code: "function name() { return Promise.all( [Promise.resolve()] ); }",
            errors: [{ message: "Promise.all is forbidden" }]
        },
        {
            code: "var funcptr = Promise.all;",
            errors: [{ message: "Promise.all is forbidden" }]
        }
    ]
} );

ruleTester.run( "noPromiseRace", noPromiseRace, {
    valid: [
        "function prom() { return Promise.resolve(); }",
        "function prom() { return Promise.reject(); }",
        "Promise.someOtherProperty = {};",
        "var val = new Promise( function( res, rej ) { return 0; } );"
    ],

    invalid: [
        {
            code: "function name() { return Promise.race( [Promise.resolve()] ); }",
            errors: [{ message: "Promise.race is forbidden" }]
        },
        {
            code: "var funcptr = Promise.race;",
            errors: [{ message: "Promise.race is forbidden" }]
        }
    ]
} );

function generateSetTimeoutInvalidTests( funcName ) {
    return [
        {
            code: funcName + "()",
            errors: [{ message: "global " + funcName + " method is forbidden" }]
        },
        {
            code: funcName + "( function() {}, 500 );",
            errors: [{ message: "global " + funcName + " method is forbidden" }]
        },
        {
            code: "function name() { " + funcName + "( function() {}, 1000 ); }",
            errors: [{ message: "global " + funcName + " method is forbidden" }]
        },
        {
            code: "global." + funcName + "( function() {}, 500 );",
            errors: [{ message: "global " + funcName + " method is forbidden" }]
        },
        {
            code: "function name() { global." + funcName + "( function() {}, 1000 ); }",
            errors: [{ message: "global " + funcName + " method is forbidden" }]
        },
        {
            code: "window." + funcName + "( function() {}, 500 );",
            errors: [{ message: "global " + funcName + " method is forbidden" }]
        },
        {
            code: "function name() { window." + funcName + "( function() {}, 1000 ); }",
            errors: [{ message: "global " + funcName + " method is forbidden" }]
        }
    ];
}

var forbidden = ["setTimeout", "clearTimeout", "setInterval", "clearInterval"];
var setTimeoutInvalidTests = [];
for ( var i = 0; i < forbidden.length; ++i ) {
    setTimeoutInvalidTests.concat( generateSetTimeoutInvalidTests( forbidden[i] ) );
}


ruleTester.run( "noSetTimeout", noSetTimeout, {
    valid: [
        "setTimeout3()",
        "asetTimeout( function() {}, 500 );",
        "function name() { setTimeout2( function() {}, 1000 ); }",
        "function name() { _setTimeout( function() {}, 1000 ); }",
        "myobject.setTimeout( function() {}, 1000 );",
        "function name() { myobject.setTimeout( function() {}, 1000 ); }"
    ],

    invalid: setTimeoutInvalidTests
} );
