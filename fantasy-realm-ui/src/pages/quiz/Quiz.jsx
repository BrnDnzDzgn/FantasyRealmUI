import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../../components/ui/carousel"
  import {
    Form,
    FormField,
  } from "../../components/ui/form"
  import { Button } from "../../components/ui/button";
  import { useForm } from "react-hook-form"
  import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [questionChoicesMap, setQuestionChoicesMap] = useState({});
  
    const form = useForm({
      defaultValues: {
        selections: {},
      },
    });

    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [questionsRes, choicesRes] = await Promise.all([
            fetch("https://localhost:7219/api/Questions"),
            fetch("https://localhost:7219/api/QuestionChoices")
          ]);
  
          const questionsData = await questionsRes.json();
          const choicesData = await choicesRes.json();
  
          setQuestions(questionsData);
  
          const map = {};
          questionsData.forEach((q, index) => {
            const matched = choicesData.filter(c => c.questionId === q.id).map(c => c.choice);
            while (matched.length < 4) {
              matched.push("");
            }
            map[q.id] = matched.slice(0, 4);
          });
          setQuestionChoicesMap(map);
  
          const initialSelections = {};
          questionsData.forEach((_, index) => {
            initialSelections[`item${index + 1}`] = "";
          });
          form.reset({ selections: initialSelections });
  
        } catch (error) {
          console.error("❌ Failed to fetch data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    function onSubmit(values) {
      console.log("Form submitted with:", values);
      navigate("/results");
    }
  
    return (
      <div className="p-10 bg-white shadow-md rounded-lg max-w-[800px] w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-20">
            <Carousel>
              <CarouselContent>
                {questions.map((question, index) => {
                  const itemId = `item${index + 1}`;
                  const options = questionChoicesMap[question.id] || ["", "", "", ""];
                  return (
                    <CarouselItem key={question.id}>
                      <p className="text-center mb-4 font-semibold text-lg">
                        {question.verbiage}
                      </p>
                      <FormField
                        control={form.control}
                        name={`selections.${itemId}`}
                        render={({ field }) => (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-col items-start space-y-2"
                          >
                            {options.map((option, optIndex) => (
                              <div key={`opt-${optIndex}`} className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={option}
                                  id={`${itemId}-option${optIndex + 1}`}
                                  disabled={!option}
                                />
                                <label
                                  htmlFor={`${itemId}-option${optIndex + 1}`}
                                  className="text-sm"
                                >
                                  {option || <span className="text-gray-400">Empty</span>}
                                </label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <Button type="submit">Start Adventure</Button>
          </form>
        </Form>
      </div>
    );
  }
  
  export default Quiz;