package com.cpe.springboot.logs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;

import javax.jms.ConnectionFactory;


@EnableJms
@SpringBootApplication
public class LogServiceApplication {

	/**
	 * LISTENER
	 */
	@Bean
	public JmsListenerContainerFactory< ? > connectionFactory(ConnectionFactory connectionFactory,
															  DefaultJmsListenerContainerFactoryConfigurer configurer) {
		DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
		// This provides all boot's default to this factory, including the message converter
		configurer.configure(factory, connectionFactory);
		// You could still override some of Boot's default if necessary.

		//enable topic mode
		factory.setPubSubDomain(true);
		return factory;
	}

	public static void main(String[] args) {
		SpringApplication.run(LogServiceApplication.class, args);
	}

}
