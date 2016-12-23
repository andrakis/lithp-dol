/**
 * Extension library for DOL.
 *
 */

"use strict";

var util = require('util'),
	inspect = util.inspect;
// TODO: Ensure correct path to lithp/index.js.
//       Projects using Lithp as a Node module should adjust this path.
var lithp = require('lithp'),
	Lithp = lithp.Lithp,
	debug = lithp.debug,
	types = lithp.Types,
	OpChain = types.OpChain,
	Atom = types.Atom,
	GetAtoms = types.GetAtoms,
	FunctionCall = types.FunctionCall,
	FunctionReentry = types.FunctionReentry,
	FunctionDefinition = types.FunctionDefinition,
	FunctionDefinitionNative = types.FunctionDefinitionNative,
	AnonymousFunction = types.AnonymousFunction,
	LiteralValue = types.LiteralValue,
	VariableReference = types.VariableReference,
	Tuple = types.Tuple;

var builtins = {};
function builtin (name, params, body) {
	builtins[name] = {params: params, body: body};
}

function inbuilt (self, name, args, State) {
	return builtins[name].body.apply(self, args);
}

builtin("obj-methods", ['Obj'], Obj => Object.getOwnPropertyNames(Obj));

builtin("math-lib", [], () => Math);
builtin("math-methods", [], () => inbuilt(this, "obj-methods", [Math]));

exports.setup = function(lithp) {
	var count = 0;
	for(var k in builtins) {
		lithp.builtin(k, builtins[k].params, builtins[k].body);
		count++;
	}
	return count;
};


