import { shows } from "@/data/shows";
import { vapi } from "../../lib/vapi.sdk";
import { MessageTypeEnum } from "../../lib/types/conversation.type";

interface TicketProps {
  type: "confirm" | "ticket";
  show: (typeof shows)[0];
  params: any;
}

function Ticket({
  type = "confirm",
  show = shows[0],
  params = {},
}: TicketProps) {
  const confirmDetails = () => {
    vapi.send({
      type: MessageTypeEnum.ADD_MESSAGE,
      message: {
        role: "user",
        content: `Looks good to me. Lets go ahead.`,
      },
    });
  };
  return (
    <div className={`bg-slate-100  rounded-xl`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <img
              className="w-full rounded-lg shadow-lg"
              src={show.img}
              alt="Concert Image"
              width={200}
            />
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <h1 className="text-3xl font-bold mb-4">{show.title}</h1>

            {type === "ticket" ? (
              <p className="bg-green-500 text-white rounded-md w-full px-4 py-3 mb-6">
                Your ticket has been booked successfully.
              </p>
            ) : null}
            <p className="text-lg mb-6">{show.description}</p>
            <div className="mb-6">
              <p className="text-xl font-bold mb-2">When:</p>
              <p className="text-lg">
                {new Date(params.date ?? show.date).toLocaleString()}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-xl font-bold mb-2">Where:</p>
              <p className="text-lg">{show.theatre}</p>
              <p className="text-lg">{show.venue}</p>
            </div>
            <div className="mb-6">
              <p className="text-xl font-bold mb-2">Tickets:</p>
              <p className="text-lg">${show.price} - General Admission</p>
            </div>
            {type == "confirm" ? (
              <button
                onClick={confirmDetails}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Confirm Bookings
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Ticket };
