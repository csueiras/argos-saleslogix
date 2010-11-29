/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.DetailBase = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity'
        },
        alarmText: 'reminder',
        alarmTimeText: 'reminder',
        categoryText: 'category',
        durationText: 'duration',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        leaderText: 'leader',
        longNotesText: 'notes',
        priorityText: 'priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startingText: 'start time',
        timelessText: 'timeless',
        titleText: 'Activity',
        typeText: 'type',

        //View Properties
        querySelect: [
            'AccountId',
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'Company',
            'ContactId',
            'ContactName',
            'Description',
            'Duration',
            'UserId',
            'LeadId',
            'LeadName',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'Priority',
            'Rollover',
            'StartDate',
            'TicketId',
            'TicketNumber',
            'Timeless',
            'Type'
        ],
        resourceKind: 'activities',

        formatActivityType: function(val) {
            return this.activityTypeText[val] || val;
        },
        init: function() {
            Mobile.SalesLogix.Activity.DetailBase.superclass.init.apply(this, arguments);

            this.tools.fbar = [{
                cls: '',
                fn: function() {
                    App.navigateToActivityInsertView.call(App, {"id": this.id});
                },
                icon: 'content/images/icons/job_24.png',
                name: 'schedule',
                scope: this,
                title: this.fbarScheduleTitleText
            }];
        },
        processEntry: function(entry) {
          if (entry && entry.UserId)
          {
                var request = new Sage.SData.Client.SDataResourcePropertyRequest(this.getService())
                    .setResourceKind('userInfo')
                    .setQueryArg('select', 'FirstName,MiddleName,LastName')
                    .setQueryArg('where', String.format("id eq '{0}'", entry.UserId));

                request.readFeed({
                    success: function(feed) {
                        if (feed && feed['$resources']) 
                        {
                            entry['UserId'] = feed['$resources'][0];
                            Mobile.SalesLogix.Activity.DetailBase.superclass.processEntry.call(this, entry);
                        }
                    },
                    failure: function() {
                    },
                    scope: this
                });
            }
            else
            {
                Mobile.SalesLogix.Activity.DetailBase.superclass.processEntry.apply(this, arguments);
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Type',
                    label: this.typeText,
                    renderer: this.formatActivityType.createDelegate(this)
                },
                {
                    name: 'Description',
                    label: this.regardingText
                },
                {
                    name: 'Priority',
                    label: this.priorityText
                },
                {
                    name: 'Category',
                    label: this.categoryText
                },
                {
                    name: 'StartDate',
                    label: this.startingText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, ['M/d/yyyy h:mm:ss tt'], true
                    )
                },
                {
                    name: 'Timeless',
                    label: this.timelessText
                },
                {
                    name: 'Duration',
                    label: this.durationText
                },
                {
                    name: 'Alarm',
                    label: this.alarmText
                },
                {
                    name: 'AlarmTime',
                    label: this.alarmTimeText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, ['M/d/yyyy h:mm:ss tt'], true
                    )
                },
                {
                    name: 'Rollover',
                    label: this.rolloverText
                },
                {
                    name: 'UserId',
                    label: this.leaderText,
                    renderer: Mobile.SalesLogix.Format.nameLF.createDelegate(this)
                },
                {
                    name: 'LongNotes',
                    label: this.longNotesText
                }
            ]);
        }        
    });
})();
