
import java.util.Comparator;
import java.util.stream.Collectors;


// Find the most populated city of each continent

public class Exercise2 {
    public static void main(String[] args) {

        CountryDao countryDao = InMemoryWorldDao.getInstance();

        countryDao.findAllCountries().stream()
            .collect(Collectors.groupingBy(Country::getContinent))
            .forEach((continent, countries) -> { 
                countries.stream()
                    .flatMap(c -> c.getCities().stream())
                    .max(Comparator.comparing(City::getPopulation))
                    .ifPresent(city -> System.out.println(continent + " : " + city.getName() + " : " + city.getPopulation()));
            });
    }

}
