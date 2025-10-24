package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- CRITICAL: Explicit mapping to match your DB column names ---

    @Column(name = "passenger_name")
    private String passengerName;

    @Column(name = "number_of_passengers")
    private Integer numberOfPassengers;

    @Column(name = "age")
    private Integer age;

    @Column(name = "gender")
    private String gender;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "travel_id")
    private String travelId;

    @Column(name = "departure_city")
    private String departureCity;

    @Column(name = "destination_city")
    private String destinationCity;

    // FIX APPLIED: Changed type to String and mapped to correct column name
    @Column(name = "departure_date")
    private String departureDate;

    // FIX APPLIED: Changed type to String and mapped to correct column name
    @Column(name = "arrival_date")
    private String arrivalDate;

    @Column(name = "airline")
    private String airline;

    @Column(name = "fare")
    private Double fare;

    @Column(name = "seat_chosen")
    private String seatChosen;

    // -------------------------------------------------------------------
    // CONSTRUCTORS (FIX APPLIED to use String for dates)
    // -------------------------------------------------------------------

    public Booking() {
    }

    public Booking(Long id, String passengerName, Integer numberOfPassengers, Integer age, String gender, String mobileNumber, String travelId, String departureCity, String destinationCity, String departureDate, String arrivalDate, String airline, Double fare, String seatChosen) {
        this.id = id;
        this.passengerName = passengerName;
        this.numberOfPassengers = numberOfPassengers;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.travelId = travelId;
        this.departureCity = departureCity;
        this.destinationCity = destinationCity;
        this.departureDate = departureDate; // CORRECTED: Now takes String
        this.arrivalDate = arrivalDate;   // CORRECTED: Now takes String
        this.airline = airline;
        this.fare = fare;
        this.seatChosen = seatChosen;
    }


    // -------------------------------------------------------------------
    // GETTERS AND SETTERS (FIX APPLIED to use String for dates)
    // -------------------------------------------------------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public Integer getNumberOfPassengers() {
        return numberOfPassengers;
    }

    public void setNumberOfPassengers(Integer numberOfPassengers) {
        this.numberOfPassengers = numberOfPassengers;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getTravelId() {
        return travelId;
    }

    public void setTravelId(String travelId) {
        this.travelId = travelId;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    // FIX: Getter returns String
    public String getDepartureDate() {
        return departureDate;
    }

    // FIX: Setter accepts String
    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }

    // FIX: Getter returns String
    public String getArrivalDate() {
        return arrivalDate;
    }

    // FIX: Setter accepts String
    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public Double getFare() {
        return fare;
    }

    public void setFare(Double fare) {
        this.fare = fare;
    }

    public String getSeatChosen() {
        return seatChosen;
    }

    public void setSeatChosen(String seatChosen) {
        this.seatChosen = seatChosen;
    }
}