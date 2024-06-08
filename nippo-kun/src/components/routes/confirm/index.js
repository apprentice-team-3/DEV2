import { marked } from "marked";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reviewWrite } from "../../../redux/store/modules/all-review";
import CopyButton from "../../buttons/copy-button";
import Header from "../../header";
import Loading from "../../loading";
import Textarea from "../../textarea";
import "./index.css";

const Confirm = () => {
  const isLoading = useSelector((state) => state.loader.isLoading);
  const [isStateLoading, setIsStateLoading] = useState(isLoading);
  const [review, setReview] = useState("");

  const confirmReport = useSelector(
    (state) => state.confirmReporter.confirmReport
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        try {
          fetch("https://express-hello-world-a3nc.onrender.com/all-review/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              value: confirmReport,
              order: "Action",
            }),
          }).then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                const { generatedText } = data;
                dispatch(reviewWrite(generatedText));
                setReview(marked.parse(generatedText));
                setIsStateLoading(false);
              });
            }
          });
        } catch (err) {
          console.error("AIのレビューに失敗しました", err);
        }
      }
    }, 1000);
  }, [isLoading]);

  return (
    <>
      <Header />
      <div className="confirm__wrapper">
        {isStateLoading && <Loading />}
        {!isStateLoading && review && (
          <div className="review">
            <div
              dangerouslySetInnerHTML={{
                __html: review,
              }}
            ></div>
          </div>
        )}
        <Textarea />
      </div>
      <CopyButton />
    </>
  );
};

export default Confirm;
