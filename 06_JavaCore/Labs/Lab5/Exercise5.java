// • Find the highest populated capital city

import java.util.*;

public class Exercise5 {

    public static void main(String[] args) {
        CountryDao countryDao = InMemoryWorldDao.getInstance();
        CityDao cityDao = InMemoryWorldDao.getInstance();
        
        countryDao.findAllCountries().stream()
            .map(Country::getCapital).filter(Objects::nonNull)
            .map(cityDao::findCityById).filter(Objects::nonNull)
            .max(Comparator.comparing(City::getPopulation))
            .ifPresent(city -> System.out.println(city.getName() + " : " + city.getPopulation()));
    }
}