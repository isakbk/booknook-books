import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] =
    useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="contact-page">
      <section className="page-heading">
        <div className="container">
          <span className="section-label">
            WE'D LOVE TO HEAR FROM YOU
          </span>

          <h1>Contact BookNook</h1>

          <p>
            Questions about books, stationery or your
            order? Send us a message.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="section-label">
              GET IN TOUCH
            </span>

            <h2>Let's talk.</h2>

            <p>
              We're always happy to hear from readers,
              students and stationery lovers.
            </p>

            <div className="contact-item">
              <span>✉</span>
              <div>
                <strong>Email</strong>
                <p>hello@booknook.example</p>
              </div>
            </div>

            <div className="contact-item">
              <span>☎</span>
              <div>
                <strong>Phone</strong>
                <p>+91 90000 00000</p>
              </div>
            </div>

            <div className="contact-item">
              <span>⌖</span>
              <div>
                <strong>Location</strong>
                <p>India</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success">
                <div>✓</div>

                <h3>Message sent!</h3>

                <p>
                  Thanks for contacting BookNook.
                  We'll get back to you soon.
                </p>

                <button
                  className="btn btn-outline"
                  onClick={() =>
                    setSubmitted(false)
                  }
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <label>
                  Name
                  <input required />
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    required
                  />
                </label>

                <label>
                  Subject
                  <input required />
                </label>

                <label>
                  Message
                  <textarea
                    rows="6"
                    required
                  />
                </label>

                <button
                  className="btn btn-accent"
                  type="submit"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}