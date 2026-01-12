import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import AppLayout from "../Components/ui-custom/AppLayout";
import PageHeader from "../Components/ui-custom/PageHeader";
import Card from "../Components/ui-custom/Card";
import Input from "../Components/ui-custom/Input";
import Button from "../Components/ui-custom/Button";
import { useAuth } from "../Components/auth/AuthContext";

import {
  FileText,
  User,
  Phone,
  MapPin,
  Activity,
  Send,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export default function FillForm() {
  const navigate = useNavigate();
  const { authFetch } = useAuth(); // ⭐ IMPORTANT – use authenticated fetch

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

  // -------- SUBMIT -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await authFetch("http://localhost:7000/api/auth/fill-form", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setIsLoading(false);

      if (!res.success) {
        setServerError(res.message || "Failed to submit form");
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
        {serverError && <div className='server-error'>{serverError}</div>}

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
    </AppLayout>
  );
}

