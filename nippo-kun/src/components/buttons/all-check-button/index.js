import { marked } from "marked";
import { useDispatch, useSelector } from "react-redux";
import { write } from "../../../redux/store/modules/pdcaList";
import "./index.css";

const AllCheckButton = () => {
  const dispatch = useDispatch();

  const pdcaList = useSelector(
    (state) => state.pdcaLister && state.pdcaLister.pdcaList
  );

  const onClick = async () => {
    const pdca = pdcaList.filter((item) => item.isOpen)[0];

    const markdown = `
    # Plan
    ${pdca.plan}
    # Do
    ${pdca.do}
    # Check
    ${pdca.check}
    # Action
    ${pdca.action}
    `;

    dispatch(write({ isLoading: true }));

    try {
      const response = await fetch(
        "https://express-hello-world-a3nc.onrender.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: markdown,
            order: "PDCA",
          }),
        }
      );

      if (response.ok) {
        response.json().then((data) => {
          const { generatedText } = data;

          if (generatedText.length > 128) {
            const commonFeedbackText = marked.parse(
              generatedText.slice(0, 128)
            );
            const addFeedbackText = marked.parse(generatedText.slice(128));

            dispatch(
              write({
                commonFeedbackText,
                addFeedbackText,
                isLoading: false,
                isTruncated: true,
              })
            );
          } else {
            const commonFeedbackText = marked.parse(generatedText);

            dispatch({
              commonFeedbackText,
              addFeedbackText: "",
              isLoading: false,
              isTruncated: false,
            });
          }
        });
      }
    } catch (e) {
      dispatch({
        commonFeedbackText: "エラーが発生しました。もう一度お試しください。",
        addFeedbackText: "",
        isLoading: false,
        isTruncated: false,
      });
    }
  };

  return (
    <div className="all-check-button__wrapper">
      <button className="all-check-button" onClick={onClick}></button>
    </div>
  );
};

export default AllCheckButton;
