package com.example.demo.controller;

import com.example.demo.model.Booking;
import com.example.demo.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // Handles JSON/API requests
@RequestMapping("/api/bookings") // Matches the fetch URL in your boarding_pass.html
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    /**
     * Handles POST requests from the JavaScript fetch API.
     * URL: POST http://localhost:8080/api/bookings
     */
    @PostMapping // Maps to /api/bookings POST request
    public Booking createBooking(@RequestBody Booking booking) {

        // CRITICAL: Log the object received from the frontend (NEW ADDITION)
        System.out.println("--- Booking Request Received ---");
        System.out.println("  Passenger: " + booking.getPassengerName());
        System.out.println("  Travel ID: " + booking.getTravelId());
        System.out.println("  Fare: " + booking.getFare());
        System.out.println("  Seats: " + booking.getSeatChosen());

        System.out.println("Attempting to save booking for: " + booking.getPassengerName());

        try {
            // Save the received data
            Booking savedBooking = bookingRepository.save(booking);
            System.out.println("Booking successfully saved to DB with ID: " + savedBooking.getId());
            return savedBooking; // Returns the saved booking object (as JSON) to the frontend
        } catch (Exception e) {
            // CRITICAL: If a database error occurs, this block executes.
            System.err.println("FATAL DATABASE SAVE ERROR (The Exception is below):");
            e.printStackTrace();

            // Throw a RuntimeException. This sends an HTTP 500 error back to the frontend.
            throw new RuntimeException("Error saving booking to database: Check server logs for details.");
        }
    }

    /**
     * Handles GET requests to retrieve all bookings.
     * URL: GET http://localhost:8080/api/bookings
     */
    @GetMapping // Maps to /api/bookings GET request
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}