package org.appstore.infrastructure;

import java.util.List;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import org.appstore.persistence.DAOException;

public class GenericDAOJPA<T> {

	private static EntityManager entityManager;
	// TODO [CMP] is really necessary?
	private Logger logger = Logger.getLogger(GenericDAOJPA.class.getName());

	public GenericDAOJPA() {
		GenericDAOJPA.entityManager = new JPAHelper().getEntityManager();
	}

	public void create(T entity) throws DAOException {
		logger.info("GenericDAOJPA CREATING " + entity.getClass().getName()
				+ "...");

		EntityTransaction tx = null;

		try {
			tx = entityManager.getTransaction();
			tx.begin();
			entityManager.persist(entity);
			tx.commit();
			logger.info("GenericDAOJPA CREATE committed.");
		} catch (Exception ex) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}

			throw new DAOException("ERROR GenericDAOJPA.create():\n", ex);
		}
	}

	public List<T> read(Class<T> c) throws DAOException {
		try {
			String entityName = c.getName().substring(
					c.getName().lastIndexOf('.') + 1);

			return readList("SELECT e FROM " + entityName + " e");
		} catch (Exception ex) {
			throw new DAOException("ERROR GenericDAOJPA.read():\n", ex);
		}
	}

	public T read(Class<T> c, Object id) throws DAOException {
		logger.info("GenericDAOJPA READING " + c.getName() + ".id = "
				+ id.toString() + "...");

		try {
			return entityManager.find(c, id);
		} catch (RuntimeException ex) {
			throw new DAOException("ERROR GenericDAOJPA.read():\n", ex);
		}
	}

	@SuppressWarnings("unchecked")
	protected List<T> readList(String queryString,
			final Object... positionalParams) {
		Query query = entityManager.createQuery(queryString);
		int i = 0;

		for (Object p : positionalParams) {
			query.setParameter(++i, p);
		}

		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	protected T readOne(String queryString, final Object... positionalParams) {
		Query query = entityManager.createQuery(queryString);
		int i = 0;

		for (Object p : positionalParams) {
			query.setParameter(++i, p);
		}

		return (T) query.getSingleResult();
	}

	public void update(T entity) throws DAOException {
		logger.info("GenericDAOJPA UPDATING " + entity.getClass().getName()
				+ "...");
		EntityTransaction tx = null;

		try {
			tx = entityManager.getTransaction();
			tx.begin();
			entity = entityManager.merge(entity);
			tx.commit();
		} catch (Exception ex) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
				logger.info("GenericDAOJPA UPDATE committed.");
			}

			throw new DAOException("ERROR GenericDAOJPA.update():\n", ex);
		}
	}

	public void delete(Class<T> c, Object id) throws DAOException {
		logger.info("GenericDAOJPA DELETING " + c.getName() + ".id = "
				+ id.toString() + "...");
		EntityTransaction tx = null;

		try {
			tx = entityManager.getTransaction();
			tx.begin();
			T entity = entityManager.find(c, id);
			entityManager.remove(entity);
			tx.commit();
			logger.info("GenericDAOJPA DELETE committed.");
		} catch (Exception ex) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}

			throw new DAOException("ERROR GenericDAOJPA.delete():\n", ex);
		}
	}
}
