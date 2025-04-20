package com.Sloth.model;

import com.Sloth.repo.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService{

    @Autowired
    ExpenseRepository expenseRepository;
    User user;
    Expense expense;


    // Creates a new Expense object and stores it into the db.
    public void createExpense(Expense newExpense){
        Expense expense = new Expense(newExpense.getUserId(), newExpense.getDate(), newExpense.getAmount(), newExpense.getCategory(), newExpense.getDescription());
        expenseRepository.save(expense);
    }

    //Removes a single expense by its id.
    public void removeExpense(long id){
        expenseRepository.deleteById(id);
    }

    //Gets all available expenses.
    public List<Expense> displayAllExpenses(){
        System.out.println("Fetching all expenses...");
        return expenseRepository.findAll();
    }

    public List<Expense> getExpensesByUser(long userId, Long limit, Long offset){
        return expenseRepository.findExpenseByUserId(userId, limit, offset);
    }

    public List<Expense> getAllExpensesByUser(long userId){
        return expenseRepository.findAllExpenseByUserId(userId);
    }

    public List<Expense> getExpensesByCategory(Long userId, String category){
        return expenseRepository.findExpenseByCategory(userId, category);
    }

    public List<Expense> getCurrentUsersExpensesBySelectedDateEqualsDate(Long userId, LocalDate date){
        return expenseRepository.findExpenseByDateEqualsDate(userId, date);
    }

    public List<Expense> getCurrentUsersExpensesBySelectedDateLessThanDate(Long userId, LocalDate date){
        return expenseRepository.findExpenseByDateLessThanDate(userId, date);
    }

    public List<Expense> getCurrentUsersExpensesBySelectedDateGreaterThanDate(Long userId, LocalDate date){
        return expenseRepository.findExpenseByDateGreaterThanDate(userId, date);
    }

    public List<Expense> getCurrentUsersExpensesByAmountRange(Long userId, double low, double high){
        return expenseRepository.findExpensesByAmountRange(userId, low, high);
    }

    public void removeAllExpensesFromUser(Long userId){
        expenseRepository.deleteExpensesById(userId);
    }

    public void removeUser(Long userId){
        expenseRepository.deleteUserById(userId);
    }

    //Create a query for the filter methods
//    public void filterByAmount(double amount){
//
//    }
//
//    public void filterByCategory(String category){
//
//    }
}
