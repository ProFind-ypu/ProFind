package com.profind.profind_backend;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import org.springframework.context.annotation.Bean;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.SerializationFeature;

import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import java.time.Duration;

@SpringBootApplication
@EnableCaching
public class ProFindApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProFindApplication.class, args);
    }

    /**
     * Configure Jackson's ObjectMapper so date/time types are serialized nicely.
     * Spring Boot auto-configures an ObjectMapper, but we override/add modules we need.
     */
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        // Support java.time types (Instant, LocalDate, etc.)
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return mapper;
    }

    /**
     * Redis-backed CacheManager for @Cacheable support.
     * Adjust TTL and prefix as needed.
     */
/*
    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        RedisCacheConfiguration defaultConfig = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))         // default TTL (adjust to your NFRs)
            .prefixCacheNameWith("profind::")
            .disableCachingNullValues();

        return RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(defaultConfig)
                .build();
    }
*/
}
