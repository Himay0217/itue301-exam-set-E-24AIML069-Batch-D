import { useState } from 'react';
import VehicleCard from '../components/VehicleCard';
import { useAuth } from '../context/AuthContext';

/**
 * Mock vehicle data.
 * This will be replaced with real API data in a later task.
 */
const mockVehicles = [
  { id: 1, model: 'Toyota Camry',    type: 'Sedan',    pricePerDay: 55,  available: true  },
  { id: 2, model: 'Ford Mustang',    type: 'Coupe',    pricePerDay: 95,  available: true  },
  { id: 3, model: 'BMW 3 Series',    type: 'Sedan',    pricePerDay: 120, available: false },
  { id: 4, model: 'Tesla Model 3',   type: 'Electric', pricePerDay: 110, available: true  },
  { id: 5, model: 'Honda Civic',     type: 'Sedan',    pricePerDay: 45,  available: false },
  { id: 6, model: 'Chevrolet Malibu',type: 'Sedan',    pricePerDay: 50,  available: true  },
];

/**
 * FleetPage
 *
 * Displays the vehicle fleet and a booking form.
 *
 * State:
 *   selectedVehicle  — the vehicle object the customer clicked "Book Now" on
 *   pickupDate       — controlled input: booking start date
 *   returnDate       — controlled input: booking end date
 *   bookingMessage   — success or error feedback after form submit
 *   submitting       — prevents double-submit
 */
const FleetPage = () => {
  const { token } = useAuth();

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [pickupDate, setPickupDate]           = useState('');
  const [returnDate, setReturnDate]           = useState('');
  const [bookingMessage, setBookingMessage]   = useState(null); // { type: 'success'|'error', text }
  const [submitting, setSubmitting]           = useState(false);

  // Called by VehicleCard's "Book Now" button
  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setBookingMessage(null);  // clear previous feedback
    setPickupDate('');
    setReturnDate('');
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVehicle) return;

    setSubmitting(true);
    setBookingMessage(null);

    // Calculate total price based on days
    const start      = new Date(pickupDate);
    const end        = new Date(returnDate);
    const msPerDay   = 1000 * 60 * 60 * 24;
    const days       = Math.max(1, Math.ceil((end - start) / msPerDay));
    const totalPrice = days * selectedVehicle.pricePerDay;

    try {
      const res = await fetch('/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          car: selectedVehicle.id,
          startDate: pickupDate,
          endDate: returnDate,
          totalPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setBookingMessage({ type: 'error', text: data.message || 'Booking failed. Please try again.' });
      } else {
        setBookingMessage({
          type: 'success',
          text: `Booking confirmed for ${selectedVehicle.model}! Total: $${totalPrice}`,
        });
        // Reset form
        setSelectedVehicle(null);
        setPickupDate('');
        setReturnDate('');
      }
    } catch {
      setBookingMessage({ type: 'error', text: 'Network error — please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Available Fleet</h1>
      <p style={styles.sub}>Click "Book Now" on a vehicle to start your reservation</p>

      {/* Vehicle grid */}
      <div style={styles.grid}>
        {mockVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            model={vehicle.model}
            type={vehicle.type}
            pricePerDay={vehicle.pricePerDay}
            available={vehicle.available}
            onBookNow={() => handleSelectVehicle(vehicle)}
          />
        ))}
      </div>

      {/* Booking form — only shown once a vehicle is selected */}
      {selectedVehicle && (
        <div style={styles.formWrapper}>
          <h2 style={styles.formHeading}>Book a Vehicle</h2>

          {/* Live display of the currently selected vehicle — updates as state changes */}
          <p style={styles.selectedInfo}>
            Selected: <strong>{selectedVehicle.model}</strong> — ${selectedVehicle.pricePerDay} / day
          </p>

          <form onSubmit={handleBookingSubmit} style={styles.form}>
            <label style={styles.label} htmlFor="pickupDate">
              Pickup Date
            </label>
            <input
              id="pickupDate"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              style={styles.input}
              required
            />

            <label style={styles.label} htmlFor="returnDate">
              Return Date
            </label>
            <input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              style={styles.input}
              required
            />

            <div style={styles.formActions}>
              <button
                type="button"
                onClick={() => setSelectedVehicle(null)}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
              <button type="submit" style={styles.submitBtn} disabled={submitting}>
                {submitting ? 'Booking…' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success / error feedback */}
      {bookingMessage && (
        <p
          style={
            bookingMessage.type === 'success'
              ? styles.successMsg
              : styles.errorMsg
          }
        >
          {bookingMessage.text}
        </p>
      )}
    </div>
  );
};

const styles = {
  page: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  heading: {
    margin: '0 0 4px',
    fontSize: '1.8rem',
  },
  sub: {
    margin: '0 0 28px',
    color: '#666',
    fontSize: '0.95rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  formWrapper: {
    marginTop: '36px',
    padding: '24px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    maxWidth: '480px',
  },
  formHeading: {
    margin: '0 0 8px',
    fontSize: '1.2rem',
  },
  selectedInfo: {
    margin: '0 0 16px',
    color: '#2563eb',
    fontSize: '0.95rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.95rem',
    outline: 'none',
  },
  formActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  cancelBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#e5e7eb',
    color: '#374151',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  submitBtn: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },
  successMsg: {
    marginTop: '20px',
    padding: '12px 16px',
    backgroundColor: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
  errorMsg: {
    marginTop: '20px',
    padding: '12px 16px',
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    borderRadius: '4px',
    fontSize: '0.9rem',
  },
};

export default FleetPage;
