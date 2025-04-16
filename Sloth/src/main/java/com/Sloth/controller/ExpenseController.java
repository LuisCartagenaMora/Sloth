package com.Sloth.controller;

import com.Sloth.model.Expense;
import com.Sloth.model.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("/expenses")
    public List<Expense> getAllExpenses(){
        return expenseService.displayAllExpenses();
    }

    @GetMapping("/expenses/{userId}")
    public List<Expense> getCurrentUsersExpenses(@PathVariable long userId, @RequestParam Long limit, @RequestParam Long offset){
        return expenseService.getExpensesByUser(userId, limit, offset);
    }

    @GetMapping("/all-expenses/{userId}")
    public List<Expense> getAllCurrentUsersExpenses(@PathVariable long userId){
        return expenseService.getAllExpensesByUser(userId);
    }

    @GetMapping("/filter-expenses/{userId}/{category}")
    public List<Expense> getCurrentUsersExpensesByCategory(@PathVariable Long userId, @PathVariable String category){
        return expenseService.getExpensesByCategory(userId, category);
    }

    @GetMapping("/filter-expenses/{userId}/equals={date}")
    public List<Expense> getCurrentUsersExpensesBySelectedDateEqualsDate(@PathVariable Long userId, @PathVariable LocalDate date){
        return expenseService.getCurrentUsersExpensesBySelectedDateEqualsDate(userId, date);
    }

    @GetMapping("/filter-expenses/{userId}/less={date}")
    public List<Expense> getCurrentUsersExpensesBySelectedDateLessThanDate(@PathVariable Long userId, @PathVariable LocalDate date){
        return expenseService.getCurrentUsersExpensesBySelectedDateLessThanDate(userId, date);
    }

    @GetMapping("/filter-expenses/{userId}/greater={date}")
    public List<Expense> getCurrentUsersExpensesBySelectedDateGreaterThanDate(@PathVariable Long userId, @PathVariable LocalDate date){
        return expenseService.getCurrentUsersExpensesBySelectedDateGreaterThanDate(userId, date);
    }

    @GetMapping("/filter-expenses")
    public List<Expense> getCurrentUsersExpensesBySelectedDateGreaterThanDate(@RequestParam Long userId, @RequestParam double low, @RequestParam double high){
        return expenseService.getCurrentUsersExpensesByAmountRange(userId, low, high);
    }

    @PostMapping("/new-expense")
    public void newExpense(@RequestBody Expense expense){
        expenseService.createExpense(expense);
        System.out.println("Successfully added a new expense...");
    }

    @DeleteMapping("/delete-expense/{expenseId}")
    public void deleteExpense(@PathVariable long expenseId){
        expenseService.removeExpense(expenseId);
        System.out.println("Successfully removed the expense...");
    }

    @DeleteMapping("/delete-expenses/{userId}")
    public void deleteAllExpenses(@PathVariable long userId){
        expenseService.removeAllExpensesFromUser(userId);
        System.out.println("Successfully removed the expense...");
    }

    @DeleteMapping("/delete-user/{userId}")
    public void deleteUser(@PathVariable long userId){
        expenseService.removeUser(userId);
        System.out.println("Successfully removed the expense...");
    }
}
