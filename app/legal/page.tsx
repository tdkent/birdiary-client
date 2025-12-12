import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";

export default function TOSView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Terms of Service & Privacy Policy" />
        <article>
          <p>Last Updated: December 11, 2025</p>
          <p>
            Welcome to Birdiary, a non-commercial hobby project for logging bird
            sightings. Birdiary is provided for fun and personal enjoyment. By
            using the app, you agree to the terms below.
          </p>
          <h2>What is Birdiary?</h2>
          <p>
            Birdiary is a personal side project. It may change, break, or be
            shut down at any time. I do not guarantee:
          </p>
          <ul>
            <li>that the app will always work</li>
            <li>that your data will always be available</li>
            <li>that the app will remain online indefinitely</li>
            <li>that bugs or errors will be fixed</li>
          </ul>
          <p>Use Birdiary at your own discretion and risk.</p>
          <h2>Who Can Use Birdiary?</h2>
          <p>If you choose to create an account, you must:</p>
          <ul>
            <li>provide a valid email</li>
            <li>keep your password secure</li>
            <li>follow the acceptable use rules below</li>
          </ul>
          <p>You must be at least 13 years old to use the app.</p>
          <h2>Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>break or interfere with the app</li>
            <li>try to hack, reverse-engineer, or overload the service</li>
            <li>upload harmful, unlawful, or harassing content</li>
            <li>impersonate others or misuse the service</li>
            <li>misuse location features or generate false/abusive data</li>
          </ul>
          <p>
            I reserve the right to remove content or disable accounts that
            violate these rules.
          </p>
          <h2>Accounts and User Content</h2>
          <p>If you create an account:</p>
          <ul>
            <li>
              You keep ownership of the bird sightings and profile info you
              submit.
            </li>
            <li>
              By submitting content, you give Birdiary a limited license to
              store, display, and process it as necessary to operate the app.
            </li>
            <li>
              You are responsible for the accuracy, legality, and safety of
              anything you submit.
            </li>
            <li>You may export your sighting data at any time.</li>
            <li>You may delete your account at any time.</li>
          </ul>
          <p>
            If the app is shut down, your stored data may be permanently
            deleted.
          </p>
          <h3>Browser Storage vs Database Storage</h3>
          <p>Birdiary supports two data storage modes:</p>
          <h4>Unregistered Users</h4>
          <ul>
            <li>All data is stored locally in your browser.</li>
            <li>No personal information is collected from you.</li>
            <li>Clearing your browser data will erase your sightings.</li>
          </ul>
          <h4>Registered Users</h4>
          <ul>
            <li>
              Your email, hashed password, and sightings are stored in
              Birdiary&apos;s database.
            </li>
            <li>
              You may transfer sightings from your browser to your account at
              any time.
            </li>
          </ul>
          <h2>Third-Party Services</h2>
          <p>
            Birdiary uses third-party services such as Google Places API to
            interpret or enrich location data.
          </p>
          <p>
            These services may receive limited information (such as the location
            query you make), which is subject to their own privacy practices.
          </p>
          <h2>Privacy Policy</h2>
          <h3>What Data Is Collected</h3>
          <p>
            If you create an account or interact with certain features, Birdiary
            may collect the following data:
          </p>
          <h4>Data Required for Registered Accounts</h4>
          <ul>
            <li>Email address</li>
            <li>Password (securely hashed; never stored in plain text)</li>
          </ul>
          <h4>Sighting Data</h4>
          <ul>
            <li>Bird species</li>
            <li>Date</li>
            <li>Description</li>
            <li>Location (from Google Places or other APIs)</li>
          </ul>
          <h4>Optional Profile Information</h4>
          <ul>
            <li>Username</li>
            <li>Zip-code-derived general location (not full address)</li>
            <li>Biography</li>
            <li>Favorite bird</li>
            <li>Sighting statistics generated within the app</li>
          </ul>
          <h4>Automatically Collected Data</h4>
          <ul>
            <li>Basic server logs for reliability and security</li>
            <li>
              No advertising IDs, no analytics trackers, and no third-party
              marketing cookies are used
            </li>
          </ul>
          <h3>How Your Data Is Used</h3>
          <p>Your data is used only to:</p>
          <ul>
            <li>operate and display the app</li>
            <li>maintain your account</li>
            <li>show and sync your sightings</li>
            <li>provide optional features (e.g., stats, profile pages)</li>
            <li>secure the service and prevent misuse</li>
          </ul>
          <p>
            Your data is not sold, shared with advertisers, or used for
            behavioral tracking.
          </p>
          <h3>Cookies and Local Storage</h3>
          <p>Birdiary uses only:</p>
          <ul>
            <li>Strictly necessary session cookies (for logged-in users)</li>
            <li>Local browser storage (for unregistered users)</li>
          </ul>
          <p>
            These are used solely to keep you logged in or store your own data.
            No tracking or analytics cookies are used.
          </p>
          <h3>Data Retention</h3>
          <ul>
            <li>
              Unregistered user data remains in your browser until you clear it.
            </li>
            <li>
              Registered user data remains until you delete your account or the
              project is discontinued.
            </li>
            <li>
              If Birdiary shuts down, your data may be deleted without prior
              notice.
            </li>
          </ul>
          <h2>Disclaimer of Warranties</h2>
          <p>
            Birdiary is provided <q>as is,</q> <q>as available,</q> and without
            warranties of any kind.
          </p>
          <p>I do not guarantee:</p>
          <ul>
            <li>uptime</li>
            <li>error-free operation</li>
            <li>continued availability</li>
            <li>data preservation</li>
          </ul>
          <p>Use the app at your own risk.</p>
          <h2>Limitation of Liability</h2>
          <p>To the fullest extent permitted by California law:</p>
          <ul>
            <li>
              Birdiary and its creator are not liable for any loss of data,
              damages, or problems arising from use of the app.
            </li>
            <li>
              This includes outages, bugs, data loss, misuse by other users, or
              discontinuation of the service.
            </li>
          </ul>
          <p>These terms are governed by the laws of California, USA.</p>
          <h2>Changes to These Terms</h2>
          <p>
            These Terms and the Privacy Policy may change occasionally. If the
            project is still active, I may post an update in the app when
            changes are made.
          </p>
          <h2>Contact</h2>
          <p>
            If you have questions you may contact:{" "}
            <a href="mailto:support@birdiary.com">support@birdiary.com</a>
          </p>
        </article>
      </ViewWrapper>
    </>
  );
}
