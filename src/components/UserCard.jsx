const UserCard = ({ user }) => {
  const { firstName, lastName, age, about, photo } = user;

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm rounded-3xl overflow-hidden">
        <figure>
          <img src={photo} alt="photo" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>

          <p>{age && gender && age + ", " + gender}</p>

          <p>{about}</p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
