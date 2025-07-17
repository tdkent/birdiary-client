import SightingForm from "@/components/forms/SightingForm";

export default function NewView() {
  return (
    <>
      <header>
        <h1>Add a new bird sighting</h1>
        <p>
          Add a new sighting to your birdwatching diary, including a date and
          description. Logged in users can also add a location.
        </p>
      </header>
      <section className="my-12">
        <SightingForm />
      </section>
    </>
  );
}
