/*global QUnit*/

sap.ui.define([
	"workflowberatungneukunde/workflowberatungneukunde/controller/workflowberatungneukunde.controller"
], function (Controller) {
	"use strict";

	QUnit.module("workflowberatungneukunde Controller");

	QUnit.test("I should test the workflowberatungneukunde controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});