package com.challenge.invoice_api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Invoice API")
                        .version("1.0.0")
                        .description("REST API for invoice management")
                        .contact(new Contact()
                                .name("Challenge Full Stack")
                        )
                );
    }
}