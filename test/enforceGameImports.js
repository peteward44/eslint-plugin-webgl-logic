
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../rules/enforceGameImports.js");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6, sourceType: "module" } });

ruleTester.run("enforceGameImports", rule, {
    valid: [
        "import \"Game_Logic\";",
        "import \"Game_Client\";",
		"import \"Game_Shared\";",
		"import \"Game_Assets\";",

        "import { something } from \"Game_Logic\";",
        "import { something } from \"Game_Client\";",
		"import { something } from \"Game_Shared\";",
		"import { something } from \"Game_Assets\";",
		
        "import { something as somethingelse } from \"Game_Logic\";",
        "import { something as somethingelse } from \"Game_Client\";",
		"import { something as somethingelse } from \"Game_Shared\";",
		"import { something as somethingelse } from \"Game_Assets\";",
		
        "import { something as somethingelse, another as anotherthing } from \"Game_Logic\";",
        "import { something as somethingelse, another as anotherthing } from \"Game_Client\";",
		"import { something as somethingelse, another as anotherthing } from \"Game_Shared\";",
		"import { something as somethingelse, another as anotherthing } from \"Game_Assets\";",
		
        "import { something as somethingelse, another as anotherthing } from \"Logic_Shared\";",
        "import { something as somethingelse, another as anotherthing } from \"Client_Shared\";",
		"import { something as somethingelse, another as anotherthing } from \"Assets_Shared\";",
		
		"import \"../../../../Lib_Shared/Shared_Core/js/supportedJurisdictions.js\";"
    ],
    invalid: [{
        code: "import \"MyGame_Logic\"",
        errors: [{
            message: "MyGame_Logic should be replaced with Game_Logic"
        }]
    }, {
        code: "import \"MyGame_Client\"",
        errors: [{
            message: "MyGame_Client should be replaced with Game_Client"
        }]
    }, {
        code: "import \"MyGame_Shared\"",
        errors: [{
            message: "MyGame_Shared should be replaced with Game_Shared"
        }]
    }, {
        code: "import \"MyGame_Assets\"",
        errors: [{
            message: "MyGame_Assets should be replaced with Game_Assets"
        }]
    },
	
	{
        code: "import { something } from \"MyGame_Logic\"",
        errors: [{
            message: "MyGame_Logic should be replaced with Game_Logic"
        }]
    }, {
        code: "import { something } from \"MyGame_Client\"",
        errors: [{
            message: "MyGame_Client should be replaced with Game_Client"
        }]
    }, {
        code: "import { something } from \"MyGame_Shared\"",
        errors: [{
            message: "MyGame_Shared should be replaced with Game_Shared"
        }]
    }, {
        code: "import { something } from \"MyGame_Assets\"",
        errors: [{
            message: "MyGame_Assets should be replaced with Game_Assets"
        }]
	},
	
	{
        code: "import { something as somethingelse } from \"MyGame_Logic\"",
        errors: [{
            message: "MyGame_Logic should be replaced with Game_Logic"
        }]
    }, {
        code: "import { something as somethingelse } from \"MyGame_Client\"",
        errors: [{
            message: "MyGame_Client should be replaced with Game_Client"
        }]
    }, {
        code: "import { something as somethingelse } from \"MyGame_Shared\"",
        errors: [{
            message: "MyGame_Shared should be replaced with Game_Shared"
        }]
    }, {
        code: "import { something as somethingelse } from \"MyGame_Assets\"",
        errors: [{
            message: "MyGame_Assets should be replaced with Game_Assets"
        }]
     },
	 
	{
        code: "import { something as somethingelse, another as anotherthing } from \"MyGame_Logic\"",
        errors: [{
            message: "MyGame_Logic should be replaced with Game_Logic"
        }]
    }, {
        code: "import { something as somethingelse, another as anotherthing } from \"MyGame_Client\"",
        errors: [{
            message: "MyGame_Client should be replaced with Game_Client"
        }]
    }, {
        code: "import { something as somethingelse, another as anotherthing } from \"MyGame_Shared\"",
        errors: [{
            message: "MyGame_Shared should be replaced with Game_Shared"
        }]
    }, {
        code: "import { something as somethingelse, another as anotherthing } from \"MyGame_Assets\"",
        errors: [{
            message: "MyGame_Assets should be replaced with Game_Assets"
        }]
    },
	 
	{
        code: "import { something } from \"MyGame_Logic/js/somepath.js\"",
        errors: [{
            message: "MyGame_Logic/js/somepath.js should be replaced with Game_Logic/js/somepath.js"
        }]
    }, {
        code: "import { something } from \"MyGame_Client/js/somepath.js\"",
        errors: [{
            message: "MyGame_Client/js/somepath.js should be replaced with Game_Client/js/somepath.js"
        }]
    }, {
        code: "import { something } from \"MyGame_Shared/js/somepath.js\"",
        errors: [{
            message: "MyGame_Shared/js/somepath.js should be replaced with Game_Shared/js/somepath.js"
        }]
    }, {
        code: "import { something } from \"MyGame_Assets/js/somepath.js\"",
        errors: [{
            message: "MyGame_Assets/js/somepath.js should be replaced with Game_Assets/js/somepath.js"
        }]
	},
    ]
});