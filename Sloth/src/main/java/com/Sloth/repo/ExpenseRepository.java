package com.Sloth.repo;

import com.Sloth.model.Expense;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
//    //Filter by ___ in ascending order.
//    List<Expense> findAllByOrderByDateAsc();
//    List<Expense> findAllOrderByAmountAsc();
//    List<Expense> findAllOrderByCategoryAsc();
//
//    //Filter by ___ in descending order.
//    List<Expense> findAllOrderByDateDesc();
//    List<Expense> findAllOrderByAmountDesc();
//    List<Expense> findAllOrderByCategoryDesc();


    @Query(nativeQuery = true, value = "SELECT * FROM expenses WHERE user_id = :userId LIMIT :limit OFFSET :offset")
    List<Expense> findExpenseByUserId(Long userId, Long limit, Long offset);

    @Query(nativeQuery = true, value = "SELECT * FROM expenses WHERE user_id = :userId")
    List<Expense> findAllExpenseByUserId(Long userId);

    @Query(nativeQuery = true, value = "SELECT * FROM expenses as e WHERE e.user_id = :userId AND e.category = :category")
    List<Expense> findExpenseByCategory(@Param("userId") Long userId,@Param("category") String category);

    @Query(nativeQuery = true, value = "SELECT * FROM expenses as e WHERE e.user_id = :userId AND e.date = :date")
    List<Expense> findExpenseByDateEqualsDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query(nativeQuery = true, value = "SELECT * FROM expenses as e WHERE e.user_id = :userId AND e.date <= :date")
    List<Expense> findExpenseByDateLessThanDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query(nativeQuery = true, value = "SELECT * FROM expenses as e WHERE e.user_id = :userId AND e.date >= :date")
    List<Expense> findExpenseByDateGreaterThanDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    @Query(nativeQuery = true, value ="SELECT * FROM expenses as e WHERE e.user_id = :userId AND e.amount BETWEEN :low AND :high")
    List<Expense> findExpensesByAmountRange(@Param("userId") Long userId, @Param("low") double low, @Param("high") double high);

    //Since Spring JPA expects a return from @Query like in the case of "Select", we must use @Transactional and @Modifying
    //So that it understands nothing will be returned.
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value="DELETE FROM expenses as e WHERE e.user_id = :userId")
    void deleteExpensesById(@Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value="DELETE FROM expenses as e WHERE e.user_id = :userId;\n" + "DELETE FROM users as e WHERE e.user_id = :userId")
    void deleteUserById(@Param("userId") Long userId);
}
