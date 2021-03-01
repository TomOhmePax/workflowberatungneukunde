sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"./RestModel"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createRestModel: function () {
			return RestModel.createModel();
		}

	};
});