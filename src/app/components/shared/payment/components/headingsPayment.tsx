const HeadingsPayment = ({ data, flag = "pay" }: {data: Response | undefined, flag?: string }) => {
    const statuses : { [key: string]: { [key: string]: string[] } } = {
      pay: {
          500: ["Something went wrong", "Please try again later."],
          200: ["Payment complete", "Thank you for your purchase."],
          400: ["Payment error", "Please try again later."],
          pending: ["Payment processing...", "Please wait"],
      },
      revert: {
          500: ["Something went wrong", "Please try again later."],
          200: ["Transaction has been reverted", "All games are back in cart."],
          400: ["Transaction has not been reverted", "Please try again later."],
          pending: ["Payment processing...", "Please wait"],
      }
    }
  
    return (
      <div className="headings">
            <h1>{data && data.status ? statuses[flag][data.status][0] : statuses[flag].pending[0] }</h1>
            <h2>{data && data.status ? statuses[flag][data.status][1] : statuses[flag].pending[1] }</h2>
      </div>
    )
}
export { HeadingsPayment }