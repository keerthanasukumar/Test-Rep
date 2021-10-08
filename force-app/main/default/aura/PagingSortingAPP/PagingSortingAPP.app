<aura:application extends="force:slds" controller="PagingSortingController">
	<aura:attribute type="Account[]"    name="allAccounts" />
    <aura:attribute type="Account[]"    name="currentList" />
    <aura:attribute type="Integer"      name="pageNumber"		default="1" />
    <aura:attribute type="Integer"      name="maxPage"			default="1" />
    <aura:attribute type="String"       name="sortField" />
    <aura:attribute type="Boolean"		name="sortAsc" />
    <aura:handler name="init"			value="{!this}"			action="{!c.doInit}" />
    <aura:handler name="change"			value="{!v.pageNumber}"	action="{!c.renderPage}" />
    
    <table class="slds-table slds-table--bordered slds-table--cell-buffer">
        <thead>
            <tr class="slds-text-title--caps">
                <th scope="col">
                    <div onclick="{!c.sortByName}"
                         class="slds-truncate"
                         title="Account Name">
                        Account Name
                        <aura:if isTrue="{!v.sortField=='Name'}">
                            <span>
                            	<aura:if isTrue="{!v.sortAsc}">
                                    &#8593;
                                    <aura:set attribute="else">
                                        &#8595;
                                    </aura:set>
                                </aura:if>
                            </span>
                        </aura:if>
                    </div>
                </th>
                <th scope="col">
                    <div onclick="{!c.sortByIndustry}"
                         class="slds-truncate"
                         title="Account Name">
                        Industry
                        <aura:if isTrue="{!v.sortField=='Industry'}">
                            <span>
                            	<aura:if isTrue="{!v.sortAsc}">
                                    &#8593;
                                    <aura:set attribute="else">
                                        &#8595;
                                    </aura:set>
                                </aura:if>
                            </span>
                        </aura:if>
                    </div>
                </th>
                <th scope="col">
                    <div onclick="{!c.sortByAnnualRevenue}"
                         class="slds-truncate"
                         title="Account Name">
                        Annual Revenue
                        <aura:if isTrue="{!v.sortField=='AnnualRevenue'}">
                            <span>
                            	<aura:if isTrue="{!v.sortAsc}">
                                    &#8593;
                                    <aura:set attribute="else">
                                        &#8595;
                                    </aura:set>
                                </aura:if>
                            </span>
                        </aura:if>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <aura:iteration items="{!v.currentList}"
                            var="record">
                <tr>
                	<th data-label="Account Name">
                        <div class="slds-truncate" title="{!record.Name}">
                            {!record.Name}
                        </div>
                    </th>
                	<th data-label="Industry">
                        <div class="slds-truncate" title="{!record.Industry}">
                            {!record.Industry}
                        </div>
                    </th>
                	<th data-label="Annual Revenue">
                        <div class="slds-truncate" title="{!record.AnnualRevenue}">
                            {!record.AnnualRevenue}
                        </div>
                    </th>
                </tr>
            </aura:iteration>
        </tbody>
    </table>

    <c:PaginationCMP currentPageNumber="{!v.pageNumber}" 
                        maxPageNumber="{!v.maxPage}" />
</aura:application>