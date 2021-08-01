import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { VectorMap } from "react-jvectormap";

const mapData = {
  GB: 35.0,
  KE: 100.0,
  RW: 35.89,
  UG: 15.78,
  TZ: 65.56,
  US: 89.25,
  AR: 30.78,
  BH: 45.9,
  GE: 33.25,
  BW: 35.89,
  JP: 35.89,
  CF: 35.89,
};

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2);
}

function separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

function remainingDays() {
  var date = new Date();
  var time = new Date(date.getTime());
  time.setMonth(date.getMonth() + 1);
  time.setDate(0);
  var days =
    time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;

  return days;
}

export class Dashboard extends Component {
  state = {
    results: { target: 447000, direct: 70, broker: 30, achieved: 120000 },
  };

  results = { target: 447000, direct: 70, broker: 30, achieved: 120000 };

  data = {
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
    datasets: [
      {
        label: "# closed business",
        data: [3000, 7500, 10000, 2000, 5600, 9899, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  areaData = {
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
    datasets: [
      {
        label: "Closed business",
        data: [12000, 15033, 8000, 6000, 40000, 20655, 10000, 120, 100000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: true, // 3: no fill
      },
    ],
  };

  areaOptions = {
    plugins: {
      filler: {
        propagate: true,
      },
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
  };

  doughnutPieData = {
    datasets: [
      {
        data: [30, 40, 30, 68, 89],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Major Medical", "Simple Care core", "Foundation", "Lifestyle"],
  };

  doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  scatterChartData = {
    datasets: [
      {
        label: "First Dataset",
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 0,
            y: 3,
          },
          {
            x: -25,
            y: 5,
          },
          {
            x: 40,
            y: 5,
          },
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255,99,132,1)"],
        borderWidth: 1,
      },
      {
        label: "Second Dataset",
        data: [
          {
            x: 10,
            y: 5,
          },
          {
            x: 20,
            y: -30,
          },
          {
            x: -25,
            y: 15,
          },
          {
            x: -10,
            y: 5,
          },
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  scatterChartOptions = {
    scales: {
      xAxes: [
        {
          type: "linear",
          position: "bottom",
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
  };

  showLead = () => {
    this.setState({ section: 2 });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    console.log("showing lead");
  };

  transactionHistoryData = {
    labels: [
      "Homepage",
      "Quotation",
      "Comparison",
      "Plan your trip",
      "Learn",
      "Contact us",
    ],
    datasets: [
      {
        data: [5, 10, 0, 20, 3, 5, 12],
        backgroundColor: [
          "#f72585",
          "#4895ef",
          "#111111",
          "#00d25b",
          "#ffab00",
          "#480ca8",
          "#b5179e",
        ],
      },
    ],
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 60,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }

  randomPrice = () => {
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
  };

  leads_by_country = [
    { country: "United Kingdom", no_of_leads: 6, code: "GB", premium: 56700 },
    { country: "Kenya", no_of_leads: 120, code: "KE", premium: 700000 },
    { country: "Rwanda", no_of_leads: 45, code: "RW", premium: 150000 },
    { country: "Uganda", no_of_leads: 7, code: "UG", premium: 16000 },
    { country: "Tanzania", no_of_leads: 3, code: "TZ", premium: 2000 },
  ];

  people = [
    { name: "Wendy Nyaga", target: 25000, achieved: 10 },
    { name: "Mary Ochieng", target: 25000, achieved: 16 },
    { name: "Florence Wanyoike", target: 25000, achieved: 33 },
    { name: "Sharon Langát", target: 25000, achieved: 58 },
    { name: "Sabeer Gulam", target: 25000, achieved: 2 },
    { name: "Purnima Gandhi", target: 25000, achieved: 13 },
    { name: "Yasin Mohamed", target: 25000, achieved: 79 },
  ];

  fetchTargets = () => {
    fetch(
      "https://portal.micglobalrisks.com:8082/leaderboard/api/individual-targets"
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  componentDidMount() {
    this.fetchTargets();
    // .then((data) => this.setState({ data }));
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <div className="card" style={{ height: "100vh" }}>
              <div className="row card-body">
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div id="audience-map" className="vector-map"></div>
                      <VectorMap
                        map={"world_mill"}
                        backgroundColor="transparent" //change it to ocean blue: #0077be
                        panOnDrag={true}
                        containerClassName="dashboard-vector-map"
                        focusOn={{
                          x: 0.5,
                          y: 0.5,
                          scale: 1,
                          animate: true,
                        }}
                        series={{
                          regions: [
                            {
                              scale: ["#cc3700", "#ff7d4d"],
                              normalizeFunction: "polynomial",
                              values: mapData,
                            },
                          ],
                        }}
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 mt-3">
                      <h4>Top business by Client Nationality</h4>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            {this.leads_by_country.map((l, i) => (
                              <tr key={i}>
                                <td style={{ width: "20px" }}>
                                  <img
                                    src={`https://www.countryflags.io/${l.code}/flat/64.png`}
                                    alt=""
                                  />
                                </td>
                                <td style={{ width: "150px" }}>{l.country}</td>
                                <td style={{ width: "100px" }}>
                                  {l.no_of_leads}&nbsp;lives
                                </td>
                                <td style={{ width: "100px" }}>
                                  $&nbsp;{separator(l.premium)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <div>
                        <h6>Broker/Direct Overall Set Target for June 2021</h6>
                        <h1 style={{ fontSize: "1rem" }}>
                          $&nbsp;{separator(this.results.target)}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <h6>
                        <u>Achieved so far</u>
                      </h6>
                      <h1
                        style={{ fontSize: "1rem" }}
                        className="text-success ml-2 mb-0"
                      >
                        $&nbsp;
                        {separator(Math.round(this.results.achieved))}
                      </h1>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <h6>
                        <u>Pending</u>
                      </h6>
                      <h1
                        style={{ fontSize: "1rem" }}
                        className="text-danger ml-2 mb-0 font-weight-medium"
                      >
                        $&nbsp;
                        {separator(
                          Math.round(
                            this.results.target - this.results.achieved
                          )
                        )}
                      </h1>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <h6>
                        <u>Days to target expiry</u>
                      </h6>
                      <h1
                        style={{ fontSize: "1rem" }}
                        className="text-success ml-2 mb-0 font-weight-medium"
                      >
                        {remainingDays()} Day{remainingDays() > 1 && "s"}
                      </h1>
                    </div>
                  </div>
                  <div className="row  mt-4">
                    <div className="col-xl-6 col-lg-6 col-md-6">
                      <h6>Closed business</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                      <Bar
                        height={"210px"}
                        data={this.data}
                        options={this.options}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <h5>
                    <u>Business Development Individual Targets</u>
                  </h5>
                  <br />
                  <div className="preview-list">
                    {this.people.map((p, i) => (
                      <div className="preview-item border-bottom">
                        <div className="preview-thumbnail">
                          <img
                            src={require("../../assets/images/faces/face28.jpeg")}
                            alt="face"
                            className="rounded-circle"
                          />
                        </div>
                        <div className="preview-item-content d-flex flex-grow">
                          <div className="flex-grow">
                            <div className="d-flex d-md-block d-xl-flex justify-content-between">
                              <h6 className="preview-subject">{p.name}</h6>
                              <p className="text-success ml-2 mb-0 font-weight-medium">
                                +$&nbsp;
                                {separator(
                                  Math.round(percentage(p.target, p.achieved))
                                )}
                              </p>
                              <p className="text-danger ml-2 mb-0 font-weight-medium">
                                -$&nbsp;
                                {separator(
                                  p.target -
                                    Math.round(percentage(p.target, p.achieved))
                                )}
                              </p>
                            </div>
                            <p className="text-muted">
                              $&nbsp;{separator(p.target)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
