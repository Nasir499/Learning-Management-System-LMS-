import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
} from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecords } from "../../Redux/Slices/RazorpaySlice";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	Title
);
function AdminDashboard() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { allUserCount, subscribedCount } = useSelector(
		(state) => state.stat
	);
	const { allPayments, monthlySalesRecords, finalMonth } = useSelector(
		(state) => state.razorpay
	);

	const userData = {
		labels: ["Registered Users", "Enrolled Users"],
		datasets: [
			{
				label: "User Details",
				backgroundColor: ["yellow", "green"],
				data: [allUserCount, subscribedCount],
				borderWidth: 1,
			},
		],
	};

	const myCourses = useSelector((state) => state?.course?.courseData);

	async function onCourseDelete(id) {
		if(window.confirm("Are you sure you want to delete this course?") === false) return;
		const res = await dispatch(deleteCourse(id));
		if (res?.payloas?.success) {
			await dispatch(getAllCourses());
		}
	}

	const salesData = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		fontColor: "white",
		datasets: [
			{
				label: "Sales/Month",
				backgroundColor: "red",
				data: monthlySalesRecords,
				borderWidth: 2,
				borderColor: "white",
			},
		],
	};

	useEffect(() => {
		(async () => {
			await dispatch(getAllCourses());
			await dispatch(getStatData());
			await dispatch(getPaymentRecords());
		})();
	}, []);

	return (
		<HomeLayout>
			<div className="min-h-[90vh] flex flex-col flex-wrap pt-5 gap-10 text-white">
				<h1 className="text-center text-5xl font-semibold text-yellow-500">
					ADMIN DASHBOARD
				</h1>

				<div className="grid grid-cols-2 gap-5 m-auto mx-10">
					<div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
						<div className="w-80 h-80">
							<Pie data={userData} />
						</div>

						<div className="grid grid-cols-2 gap-5">
							<div className="flex items-center justify-between p-5 rounded-md shadow-md gap-5">
								<div className="flex flex-col items-center">
									<p className="font-semibold">
										Registered Users
									</p>
									<h3 className="text-4xl font-bold">
										{allUserCount}
									</h3>
								</div>
								<FaUsers className="text-yellow-500 text-5xl" />
							</div>
							<div className="flex items-center justify-between p-5 rounded-md shadow-md gap-5">
								<div className="flex flex-col items-center">
									<p className="font-semibold">
										Enrolled Users
									</p>
									<h3 className="text-4xl font-bold">
										{subscribedCount}
									</h3>
								</div>
								<FaUsers className="text-green-500 text-5xl" />
							</div>
						</div>
					</div>

					<div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
						<div className="h-80 w-full relative ">
							<Bar
								className="absolute bottom-0 h-80 w-full"
								data={salesData}
							/>
						</div>

						<div className="grid grid-cols-2 gap-5">
							<div className="flex items-center justify-between p-5 rounded-md shadow-md gap-5">
								<div className="flex flex-col items-center">
									<p className="font-semibold">
										Subscription Count
									</p>
									<h3 className="text-4xl font-bold">
										{allPayments.count}
									</h3>
								</div>
								<FcSalesPerformance className="text-yellow-500 text-5xl" />
							</div>
							<div className="flex items-center justify-between p-5 rounded-md shadow-md gap-5">
								<div className="flex flex-col items-center">
									<p className="font-semibold">
										Total Revenue
									</p>
									<h3 className="text-4xl font-bold">
										{allPayments?.count * 499}
									</h3>
								</div>
								<GiMoneyStack className="text-green-500 text-5xl" />
							</div>
						</div>
					</div>
				</div>

				<div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
					<div className="flex w-full items-center justify-between ">
						<h1 className="text-center text-3xl font-semibold">
							Courses overview
						</h1>

						<button
							onClick={() => navigate("/course/create")}
							className="w-fit bg-yellow-500 hover:bg-yellow-700 transition-all ease-in-out  duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer">
							Create New Course
						</button>
					</div>

					<table className="table overflow-x-scroll ">
						<thead>
							<tr>
								<th className="px-6 py-3">S No</th>
								<th className="px-6 py-3">Course Title</th>
								<th className="px-6 py-3">Course Category</th>
								<th className="px-6 py-3">Instructor</th>
								<th className="px-6 py-3">Total Lectures</th>
								<th className="px-6 py-3">Description</th>
								<th className="px-6 py-3">Action</th>
							</tr>
						</thead>
						<tbody>
							{myCourses.map((course, index) => (
								<tr key={course._id}>
									<td>{index + 1}</td>
									<td>
										<textarea
											readOnly
											value={course?.title}
											className="w-40 h-auto bg-transparent resize-none"></textarea>
									</td>
									<td>{course?.category}</td>
									<td>{course?.createdBy}</td>
									<td>{course?.numberoflectures}</td>
									<td>
										<textarea
											readOnly
											value={course?.description}
											className="w-40 h-auto bg-transparent resize-none"></textarea>
									</td>
									<td className="flex items-center gap-4">
										<button
											onClick={() =>
												navigate(
													`/course/displaylectures`,
													{ state: { ...course } }
												)
											}
											className="w-fit bg-green-500 hover:bg-yellow-700 transition-all ease-in-out  duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer">
											<BsCollectionPlayFill />
										</button>
										<button
											onClick={() =>
												onCourseDelete(course?._id)
											}
											className="w-fit bg-red-500 hover:bg-yellow-700 transition-all ease-in-out  duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer">
											<BsTrash />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</HomeLayout>
	);
}

export default AdminDashboard;
