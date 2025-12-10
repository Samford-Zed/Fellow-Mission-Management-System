import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import AppLayout from "../components/ui-custom/AppLayout";
import PageHeader from "../components/ui-custom/PageHeader";
import Card from "../components/ui-custom/Card";
import Input from "../components/ui-custom/Input";
import Button from "../components/ui-custom/Button";
import {
  FileText,
  User,
  Phone,
  MapPin,
  Activity,
  FileEdit,
  Send,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function FillForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    status: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.status.trim()) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:7000/api/auth/fill-form", {
        method: "POST",
        credentials: "include", //  sends cookie to backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          status: formData.status,
          notes: formData.notes,
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (!data.success) {
        setServerError(data.message || "Failed to submit form");
        return;
      }

      setIsSuccess(true);

      setTimeout(() => {
        navigate(createPageUrl("UserDashboard"));
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      setServerError("Network error. Check server.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ---------------- SUCCESS SCREEN ----------------
  if (isSuccess) {
    return (
      <AppLayout isAdmin={false}>
        <div className='success-container'>
          <Card padding='xl' className='success-card'>
            <div className='success-icon'>
              <CheckCircle size={48} />
            </div>
            <h2>Form Submitted!</h2>
            <p>Your data has been recorded successfully.</p>
          </Card>
        </div>

        <style>{`
          .success-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
          }
          .success-card {
            text-align: center;
            max-width: 400px;
          }
          .success-icon {
            width: 80px;
            height: 80px;
            background: rgba(16, 185, 129, 0.15);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #10b981;
            margin: 0 auto 1.5rem;
          }
        `}</style>
      </AppLayout>
    );
  }

  // ---------------- FORM UI ----------------
  return (
    <AppLayout isAdmin={false}>
      <PageHeader
        title='Fill Form'
        subtitle='Submit field data collection'
        icon={FileText}
        action={
          <Button
            variant='secondary'
            icon={ArrowLeft}
            onClick={() => navigate(createPageUrl("UserDashboard"))}
          >
            Back to Dashboard
          </Button>
        }
      />

      <Card padding='xl' className='form-card'>
        {serverError && (
          <div
            style={{
              background: "rgba(255,0,0,0.15)",
              border: "1px solid rgba(255,0,0,0.3)",
              padding: "12px",
              borderRadius: "10px",
              color: "#ff9b9b",
              marginBottom: "1rem",
            }}
          >
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className='data-form'>
          <div className='form-grid'>
            <Input
              label='Full Name'
              name='name'
              placeholder='Enter full name'
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={User}
              required
            />

            <Input
              label='Phone Number'
              name='phone'
              placeholder='0911000000'
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              icon={Phone}
              required
            />

            <div className='full-width'>
              <Input
                label='Address'
                name='address'
                placeholder='Enter address'
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                icon={MapPin}
                required
              />
            </div>

            {/* STATUS BUTTONS */}
            <div className='full-width'>
              <label className='input-label'>Status *</label>
              <div className='status-options'>
                {["Active", "Inactive", "Pending", "Completed"].map(
                  (status) => (
                    <button
                      key={status}
                      type='button'
                      className={`status-option ${
                        formData.status === status ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, status }))
                      }
                    >
                      <Activity size={16} />
                      {status}
                    </button>
                  )
                )}
              </div>
              {errors.status && <p className='input-error'>{errors.status}</p>}
            </div>

            {/* NOTES */}
            <div className='full-width'>
              <label className='input-label'>Notes</label>
              <textarea
                name='notes'
                placeholder='Additional notes...'
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className='custom-textarea'
              />
            </div>
          </div>

          <div className='form-actions'>
            <Button
              type='button'
              variant='secondary'
              onClick={() => navigate(createPageUrl("UserDashboard"))}
            >
              Cancel
            </Button>

            <Button type='submit' size='lg' isLoading={isLoading} icon={Send}>
              Submit Form
            </Button>
          </div>
        </form>
      </Card>

      <style>{`
        .form-card {
          max-width: 800px;
          margin: auto;
        }
        .data-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .full-width {
          grid-column: span 2;
        }
        .status-options {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .status-option {
          padding: 0.6rem 1.1rem;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: 0.3s ease;
        }
        .status-option.selected {
          background: rgba(168,85,247,0.2);
          border-color: rgba(168,85,247,0.5);
        }
        .custom-textarea {
          width: 92%;
          padding: 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          color: white;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 1rem;
        }
        @media(max-width:640px){
          .form-grid{
            grid-template-columns: 1fr;
          }
          .full-width{
            grid-column: span 1;
          }
          .form-actions{
            flex-direction: column-reverse;
          }
        }
      `}</style>
    </AppLayout>
  );
}

