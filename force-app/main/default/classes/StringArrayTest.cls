public class StringArrayTest {
    public static List<String> generateStringArray(Integer n){
        String[] myArray = new List<String>();
        for(Integer i=0; i<n; i++){
            myArray.add('Test '+ i);
            system.debug('myArray'+ myArray[i]);
        }
        return myArray;
    }
}