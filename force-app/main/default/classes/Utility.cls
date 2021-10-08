public class Utility {
 /*To get Namespace from the organization */
    public static String getNameSpacePrefix(){
        String namespacePrefix = [SELECT NamespacePrefix FROM Organization LIMIT 1 ].NamespacePrefix;
        return namespacePrefix;
    }
}