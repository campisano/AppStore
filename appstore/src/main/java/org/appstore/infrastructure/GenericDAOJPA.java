package org.appstore.infrastructure;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.TypedQuery;

import org.appstore.persistence.DAOException;

public class GenericDAOJPA<T> {

	private static EntityManager entityManager;

	public GenericDAOJPA() {
		GenericDAOJPA.entityManager = new JPAHelper().getEntityManager();
	}

	public void create(T entity) throws DAOException {
		EntityTransaction tx = null;

		try {
			tx = entityManager.getTransaction();
			tx.begin();
			entityManager.persist(entity);
			tx.commit();
		} catch (Exception ex) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}

			throw new DAOException("ERROR GenericDAOJPA.create():\n"
					+ ex.getMessage(), ex);
		}
	}

	public List<T> read(Class<T> c) throws DAOException {
		try {
			String entityName = c.getName().substring(
					c.getName().lastIndexOf('.') + 1);

			return readList(c, "SELECT e FROM " + entityName + " e");
		} catch (Exception ex) {
			throw new DAOException("ERROR GenericDAOJPA.read():\n"
					+ ex.getMessage(), ex);
		}
	}

	public T read(Class<T> c, Object id) throws DAOException {
		try {
			return entityManager.find(c, id);
		} catch (RuntimeException ex) {
			throw new DAOException("ERROR GenericDAOJPA.read():\n"
					+ ex.getMessage(), ex);
		}
	}

	protected List<T> readList(Class<T> c, String queryString,
			final Object... positionalParams) {
		TypedQuery<T> query = entityManager.createQuery(queryString, c);
		int i = 0;

		for (Object p : positionalParams) {
			query.setParameter(++i, p);
		}

		return query.getResultList();
	}

	protected T readSingle(Class<T> c, String queryString,
			final Object... positionalParams) {
		TypedQuery<T> query = entityManager.createQuery(queryString, c);
		int i = 0;

		for (Object p : positionalParams) {
			query.setParameter(++i, p);
		}

		return query.getSingleResult();
	}

	protected T readSingleOrNull(Class<T> c, String queryString,
			final Object... positionalParams) {
		TypedQuery<T> query = entityManager.createQuery(queryString, c);
		query.setMaxResults(1);
		int i = 0;

		for (Object p : positionalParams) {
			query.setParameter(++i, p);
		}

		List<T> list = query.getResultList();

		if (list.isEmpty()) {
			return null;
		}
		return list.get(0);
	}

	public void update(T entity) throws DAOException {
		EntityTransaction tx = null;

		try {
			tx = entityManager.getTransaction();
			tx.begin();
			entity = entityManager.merge(entity);
			tx.commit();
		} catch (Exception ex) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}

			throw new DAOException("ERROR GenericDAOJPA.update():\n"
					+ ex.getMessage(), ex);
		}
	}

	public void delete(Class<T> c, Object id) throws DAOException {
		EntityTransaction tx = null;

		try {
			tx = entityManager.getTransaction();
			tx.begin();
			T entity = entityManager.find(c, id);
			entityManager.remove(entity);
			tx.commit();
		} catch (Exception ex) {
			if (tx != null && tx.isActive()) {
				tx.rollback();
			}

			throw new DAOException("ERROR GenericDAOJPA.delete():\n"
					+ ex.getMessage(), ex);
		}
	}
}
