package com.Sloth.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long expenseId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private double amount;
    private String category;
    private String description;
    @Column(name="user_id")
    Long userId;

    public Expense(){
        System.out.println("Don't erase me, seriously.");
    }

    public Expense(Long userId, LocalDate date, double amount, String category, String description){
        this.userId = userId;
        this.date = date;
        this.amount = amount;
        this.category=category;
        this.description=description;
    }

    public long getExpenseId() {
        return expenseId;
    }

    public long getUserId() {
        return userId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
