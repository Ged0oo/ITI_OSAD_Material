import java.util.*;

// Find the highest populated city of each country
public class Exercise1 {

   public static void main(String[] args) {
      InMemoryWorldDao countryDao = InMemoryWorldDao.getInstance();

      List<Country> countries = new ArrayList<>();
      
      countryDao.findAllCountries().stream()
         .map(Country::getCities).filter(Objects::nonNull)
         .map(cities -> cities.stream()
                  .max(Comparator.comparing(City::getPopulation))
                  .orElse(null))
         .filter(Objects::nonNull)
         .forEach(city -> System.out.println(city.getName() + " : " + city.getPopulation()));
   }
}