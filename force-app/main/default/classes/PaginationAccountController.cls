public class PaginationAccountController {
	@AuraEnabled
    public static List<Account> getAccount(Integer pageno,Integer displayLimits) {
        Integer pNumber = pageno;
        Integer pSize   = displayLimits;    
        Integer offset  = (pNumber - 1) * pSize;
        return [SELECT Name, AccountNumber,	Phone FROM Account LIMIT :displayLimits OFFSET :offset];
    }
}