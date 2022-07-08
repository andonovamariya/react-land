import UnsolvedBug from "../../components/Bugs/Contribute/UnsolvedBug";
import useHttp from "../../hooks/useHttp";

// const AddSolution = () => {
//     const { sendRequest, status } = useHttp(onAddSolution, true);
//     const navigate = useNavigate();
  
//     const addSolutionHandler = (bugData: InputtedDataBugs) => {
//       sendRequest(bugData);
//     };
  
//     useEffect(() => {
//       if (status === HttpStatuses.COMPLETED) {
//         navigate("/bugs");
//       }
//     }, [status, navigate]);
  
//     return (
//       <UnsolvedBug
//         onAddSolution={addSolutionHandler}
//         bugId = 
//       />
//     );
// };
// export default AddSolution;

