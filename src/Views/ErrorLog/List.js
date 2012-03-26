/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/ErrorLog/List', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    convert,
    format,
    ErrorManager,
    List
) {

    return declare('Mobile.SalesLogix.Views.ErrorLog.List', [List], {
        //Localization
        titleText: 'Error Logs',
        errorDateFormatText: 'MM/dd/yyyy hh:mm tt',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.errorDateStamp, $$.errorDateFormatText) %}</h3>',
            '<h4>{%: $.serverResponse.statusText || "" %}</h4>'
        ]),

        //View Properties
        id: 'errorlog_list',
        enableSearch: false,
        hideSearch: true,
        expose: false,
        detailView: 'errorlog_detail',

        _onRefresh: function(o) {
            this.inherited(arguments);
            if (o.resourceKind === 'errorlogs' || o.resourceKind === 'localStorage'){
                this.refreshRequired = true;
            }
        },

        requestData: function(){
            var errorItems = ErrorManager.getAllErrors();

            errorItems.sort(function(a, b){
               var A = convert.toDateFromString(a.errorDateStamp),
                   B = convert.toDateFromString(b.errorDateStamp);

               return B.compareTo(A); // new -> old
            });

            this.processFeed({
                '$resources': errorItems,
                '$totalResults': errorItems.length,
                '$startIndex': 1,
                '$itemsPerPage': 20
            });
        },

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        }
    });
});