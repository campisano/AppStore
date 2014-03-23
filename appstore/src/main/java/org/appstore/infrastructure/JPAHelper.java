package org.appstore.infrastructure;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAHelper {

	private static EntityManagerFactory entityManagerFactory = Persistence
			.createEntityManagerFactory("defaultPersistenceUnit");

	public EntityManager getEntityManager() {

		return entityManagerFactory.createEntityManager();
	}
}
