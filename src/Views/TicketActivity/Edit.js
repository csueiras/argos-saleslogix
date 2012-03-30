/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/TicketActivity/Edit', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    template,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.TicketActivity.Edit', [Edit], {

        //Localization
        titleText: 'Edit Ticket Activity',
        activityTypeText: 'type',
        activityTypeTitleText: 'Type',
        publicAccessText: 'public access',
        publicAccessTitleText: 'Public Access',
        userText: 'user',
        startDateText: 'start date',
        endDateText: 'end date',
        commentsText: 'comments',

        //View Properties
        entityName: 'TicketActivity',
        id: 'ticketactivity_edit',
        querySelect: [
            'ActivityDescription',
            'ActivityTypeCode',
            'AssignedDate',
            'CompletedDate',
            'PublicAccessCode',
            'User/UserName',
            'User/UserInfo/FirstName',
            'User/UserInfo/LastName'
        ],
        resourceKind: 'ticketActivities',

        applyContext: function(){
            this.inherited(arguments);
            
            var ticketContext = App.isNavigationFromResourceKind( ['tickets'] ),
                ticketKey = ticketContext && ticketContext.key;
            if (ticketKey) this.fields['TicketId'].setValue(ticketKey);
        },

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'TicketId',
                    property: 'Ticket.$key',
                    type: 'hidden'
                },
                {
                    label: this.activityTypeText,
                    name: 'ActivityTypeCode',
                    property: 'ActivityTypeCode',
                    requireSelection: true,
                    title: this.activityTypeTitleText,
                    storageMode: 'code',
                    picklist: 'Ticket Activity',
                    type: 'picklist'
                },{
                    label: this.publicAccessText,
                    name: 'PublicAccessCode',
                    property: 'PublicAccessCode',
                    title: this.publicAccessTitleText,
                    storageMode: 'code',
                    picklist: 'Ticket Activity Public Access',
                    type: 'picklist'
                },{
                    label: this.userText,
                    name: 'User',
                    property: 'User',
                    textProperty: 'UserInfo',
                    textTemplate: template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },{
                    label: this.startDateText,
                    name: 'AssignedDate',
                    property: 'AssignedDate',
                    type: 'date'
                },{
                    label: this.endDateText,
                    name: 'CompletedDate',
                    property: 'CompletedDate',
                    type: 'date'
                },{
                    label: this.commentsText,
                    name: 'ActivityDescription',
                    property: 'ActivityDescription',
                    rows: 6,
                    type: 'textarea'
                }
            ]);
        }
    });
});