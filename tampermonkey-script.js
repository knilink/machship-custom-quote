// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://demo.machship.com/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  function Decorate($provide) {
    $provide.decorator('quoteRouteSearchResult', function($delegate) {
      console.log('sssfoo',$delegate);
      return $delegate;
    });
  }
  console.log('foo');
  function trigger(){
    window.document.removeEventListener('DOMContentLoaded',trigger);
    window.angular.module('machQuotesModule')
      .decorator('machQuoteRouteSearchResultDirective', ['$delegate', '$log', function($delegate, $log) {

          return [{
                    restrict: 'E',
                    replace: true,
                    scope: {
                        route: '=',
                        consignment: '='
                    },
                    template: `<div class="panel">
    <div class="panel-body route-search-result  route-selectable" ng-class="{ 'route-selected': route.selected && !route.originalRoute, 'route-selectable' : !route.originalRoute}" ng-click="selectRoute()">
        <div class="row search-results-header">
            <div class="col-sm-6 col-md-6 thin-padding-right">
                <div ng-if="route.carrierLogoFileName" class="carrier-logo"
                     ng-style="{ 'background-image' : 'url(/app/css/img/carrierLogos/' + '{{route.carrierLogoFileName}}' + ')' }">
                </div>
                <div ng-if="!route.carrierLogoFileName" class="carrier-logo"
                     style="background-image: url('/app/css/img/carrierLogos/no-carrier.png')">
                </div>
                <div class="carrier-name-wrapper">
                    <div class="inline-title">{{route.carrierServiceName}} ({{route.carrierServiceAbbreviation}})</div>
                    <div>{{route.carrierName}} ({{route.carrierAccountName}})</div>
                </div>
            </div>
            <div class="col-sm-3  col-md-4 thin-padding">
                <div ng-bind-html="route.trustedEtaDisplay"></div>
                <div ng-if="route.etaAffectedByPublicHolidays && route.despatchDateAffectedByPublicHolidays" class="help-text small">The despatch date and ETA have been affected by public holidays</div>
                <div ng-if="route.etaAffectedByPublicHolidays && !route.despatchDateAffectedByPublicHolidays" class="help-text small">The ETA has been affected by public holidays</div>
                <div ng-if="!route.etaAffectedByPublicHolidays && route.despatchDateAffectedByPublicHolidays" class="help-text small">The despatch date has been affected by public holidays</div>
            </div>
            <div class="col-sm-3  col-md-2 thin-padding">
                <div class="pull-right">
                    <div ng-if="!route.isHourly">
                        <div class="route-price-container" ng-if="!route.consignmentTotal.sellPricesCleared">
                            <span class="route-price-dollar-sign">$</span><span class="route-price">{{route.consignmentTotal.totalSellPrice | currency:""}}</span>
                        </div>
                        <div class="route-pricing-text pull-right">inc. Fuel &amp; GST</div>
                    </div>
                    <div ng-if="route.isHourly" class="hourly-price-indicator"><span class="label label-primary">Priced Hourly</span></div>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-body border-top" ng-show="route.selected">
        <div class="row">
            <div class="col-sm-6">
                <h4>Details</h4>
                <div class="row">
                    <div class="col-sm-4">
                        <label>Pickup</label>
                    </div>
                    <div class="col-sm-8">
                        {{route.fromLocation.description}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <label>Delivery</label>
                    </div>
                    <div class="col-sm-8">
                        {{route.toLocation.description}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <label>Carrier</label>
                    </div>
                    <div class="col-sm-8">
                        {{route.carrierName}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <label>Service</label>
                    </div>
                    <div class="col-sm-8">
                        {{route.carrierServiceName}} ({{route.carrierServiceAbbreviation}})
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <label>Account</label>
                    </div>
                    <div class="col-sm-8">
                        {{route.carrierAccountName}}
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <label>Despatch</label>
                    </div>
                    <div class="col-sm-8">
                        <span ng-if="!route.isTimeWindow">{{route.despatchDate | machDate}}</span>
                        <span ng-if="route.isTimeWindow">{{route.despatchDate | machDateTime}}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-4">
                        <label>ETA</label>
                    </div>
                    <div class="col-sm-8">
                        <span ng-if="!route.isTimeWindow">{{route.eta | machDate}}</span>
                        <span ng-if="route.isTimeWindow">{{route.eta | machDateTime}}</span>
                    </div>
                </div>
                <div ng-if="route.cutoff && !route.isPermanentPickup">
                    <div class="row">
                        <div class="col-sm-4">
                            <label>Cutoff Time</label>
                        </div>
                        <div class="col-sm-8">
                            {{route.cutoff | machTimeWithTimeZone}}<i style="font-size: 12pt" class="glyphicon glyphicon-info-sign mach-icon padding-left" uib-tooltip-html="route.cutoffInformation"></i>
                        </div>
                    </div>
                </div>
                <div ng-if="route.isPermanentPickup" class="help-text small">
                    This location has a permanent pickup. Cutoffs do not apply
                </div>
                <div class="help-block" ng-show="route.carrierServiceCustomDisclaimerMessage">
                    * {{route.carrierServiceCustomDisclaimerMessage}}
                </div>
                <h4 class="border-bottom">Route</h4>
                <div class="row" data-ng-repeat="leg in route.legs">
                    <div class="col-sm-4">
                        {{leg.duration}}
                    </div>
                    <div class="col-sm-8">
                        {{leg.fromZoneName}} <span class="glyphicon glyphicon-arrow-right pad-arrow"></span>{{leg.toZoneName}}
                        <a perm-required="broker.brokercarrierlanerates.view" href="#/admin/carriers/lanerates/view/{{leg.lanerateId}}" target="_blank">{{leg.lanerateId}}</a>
                        <span ng-if="leg.distanceBreaksApplied" class="padding-left">{{leg.distance}}km</span>
                    </div>
                </div>
                <h4 class="border-bottom">Items</h4>
                <mach-view-items items="route.items" total-items="route.totalItems" total-weight="route.totalWeight" total-volume="route.totalVolume"></mach-view-items>
            </div>
            <div class="col-sm-6">
                <mach-consignment-pricing price="route"></mach-consignment-pricing>
            </div>

        </div>
        <div class="row" ng-if="route.selected && consignment.hasNoDangerousGoods && consignment.hasCanUseDgItemsPermission && consignment.companyDgEnabled">
            <div class="col-sm-12">
                <mach-no-dg-check dg-bool="route.noDgsDeclared" multi="false"></mach-no-dg-check>
            </div>
        </div>
        <div class="row" ng-if="route.selected && consignment.hasNoDangerousGoods && consignment.hasCanUseDgItemsPermission && consignment.companyDgEnabled">
            <div class="col-sm-12">
                <div class="error pull-right padding-right" ng-show="showValidationMessages">{{dgsDeclarationError}}</div>
            </div>
        </div>
        <div class="help-block pull-right" ng-if="consignment.hasNoDangerousGoods && !consignment.companyDgEnabled">
            By creating this quote, I certify that this quote does not contain dangerous goods
        </div>

    </div>
    <div class="panel-footer" ng-show="route.selected">
      <div class="pull-left">
        <span class="route-price-dollar-sign">$</span><span class="route-price">{{route.consignmentTotal.totalSellPrice * 1.1 | currency:""}}</span>
        </div>
        <div class="btn-group dropup pull-right" uib-dropdown is-open="isopen">
            <a class="btn btn-default" ui-sref="^">Cancel</a>
            <button class="btn btn-primary" ladda="loading" ng-click="saveQuote()">Save Quote</button>
            <button type="button" id="grid-dropdown" class="btn btn-primary uib-dropdown-toggle" ng-disabled="loading" uib-dropdown-toggle>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" role="menu" aria-labelledby="grid-dropdown">
                <li><a href="#" ng-click="saveQuote(true)" no-nav>and Create Consignment</a></li>
            </ul>
        </div>

    </div>
</div>`,
                    controller: 'quoteRouteSearchResult'
                }];
      }]);
  }
  window.document.addEventListener('DOMContentLoaded',trigger);

  // Your code here...
  console.log('bar extension');
})();
