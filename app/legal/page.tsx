import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";

export default function TOSView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Terms of Service & Privacy Policy" />
        <article id="tos" className="flex flex-col gap-4">
          <p>Last Updated: December 11, 2025</p>
          <p>
            Welcome to Birdiary, a non-commercial hobby project for logging bird
            sightings. Birdiary is provided for fun and personal enjoyment. By
            using the app, you agree to the terms below.
          </p>
          <h2 className="mt-4">What is Birdiary?</h2>
          <p>
            Birdiary is a personal side project. It may change, break, or be
            shut down at any time. I do not guarantee:
          </p>
          <ul>
            <li>that the app will always work;</li>
            <li>that your data will always be available;</li>
            <li>that the app will remain online indefinitely;</li>
            <li>that bugs or errors will be fixed.</li>
          </ul>
          <p>Use Birdiary at your own discretion and risk.</p>
          <h2>Who Can Use Birdiary?</h2>
          <p>If you choose to create an account, you must:</p>
          <ul>
            <li>provide a valid email;</li>
            <li>keep your password secure;</li>
            <li>follow the acceptable use rules below.</li>
          </ul>
          <p>You must be at least 13 years old to use the app.</p>
          <h2>Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>break or interfere with the app;</li>
            <li>try to hack, reverse-engineer, or overload the service;</li>
            <li>upload harmful, unlawful, or harassing content;</li>
            <li>impersonate others or misuse the service;</li>
            <li>misuse location features or generate false/abusive data.</li>
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
          <h2>Browser Storage vs Database Storage</h2>
          <p>Birdiary supports two data storage modes:</p>
          <h3>Unregistered Users</h3>
          <ul>
            <li>All data is stored locally in your browser.</li>
            <li>No personal information is collected from you.</li>
            <li>Clearing your browser data will erase your sightings.</li>
          </ul>
          <h3>Registered Users</h3>
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
          <p>
            If you create an account or interact with certain features, Birdiary
            may collect the following data:
          </p>
          <h3>Data Required for Registered Accounts</h3>
          <ul>
            <li>Email address.</li>
            <li>Password (securely hashed; never stored in plain text).</li>
          </ul>
          <h3>Sighting Data</h3>
          <ul>
            <li>Bird species.</li>
            <li>Date.</li>
            <li>Description.</li>
            <li>Location (from Google Places or other APIs).</li>
          </ul>
          <h3>Optional Profile Information</h3>
          <ul>
            <li>Username.</li>
            <li>Zip-code-derived general location (not full address).</li>
            <li>Biography.</li>
            <li>Favorite bird.</li>
            <li>Sighting statistics generated within the app.</li>
          </ul>
          <h3>Automatically Collected Data</h3>
          <ul>
            <li>Basic server logs for reliability and security.</li>
            <li>
              No advertising IDs, no analytics trackers, and no third-party
              marketing cookies are used.
            </li>
          </ul>
          <h2>How Your Data Is Used</h2>
          <p>Your data is used only to:</p>
          <ul>
            <li>operate and display the app;</li>
            <li>maintain your account;</li>
            <li>show and sync your sightings;</li>
            <li>provide optional features (e.g., stats, profile pages);</li>
            <li>secure the service and prevent misuse.</li>
          </ul>
          <p>
            Your data is not sold, shared with advertisers, or used for
            behavioral tracking.
          </p>
          <h2>Cookies and Local Storage</h2>
          <p>
            Birdiary only uses strictly necessary session cookies (for logged-in
            users), and local browser storage (for unregistered users).
          </p>
          <p>
            These are used solely to keep you logged in or store your own data.
            No tracking or analytics cookies are used.
          </p>
          <h2>Data Retention</h2>
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
            <li>uptime;</li>
            <li>error-free operation;</li>
            <li>continued availability;</li>
            <li>data preservation.</li>
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
          <p>
            These terms are governed by the laws of California, USA, and are
            subject to occasional change.
          </p>
          <h2>Contact</h2>
          <p>
            If you have questions you may contact:{" "}
            <a className="link-inline" href="mailto:support@birdiary.com">
              support@birdiary.com
            </a>
          </p>
        </article>
      </ViewWrapper>
    </>
  );
}
