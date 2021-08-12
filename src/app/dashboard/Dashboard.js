import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { VectorMap } from "react-jvectormap";
import Counter from "react-number-counter";

const mapData = {
  GB: 35.0,
  KE: 100.0,
  ZM: 35.89,
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

// function percentage(percent, total) {
//   return ((percent / 100) * total).toFixed(2);
// }

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
    loaded: false,
    targetTotal: 0,
    targetAchieved: 0,
    salesMembers: [],
    monthValues: [
      101340, 80655, 136990, 95752, 77009, 77352, 75669, 5495, 0, 0, 0, 0,
    ],
    salesMemberPictures: [],
  };

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
        data: this.state.monthValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 144, 99, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132,1)",
          "rgba(255, 144, 99, 1)",
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

  randomPrice = () => {
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
  };

  leads_by_country = [
    { country: "United Kingdom", no_of_leads: 6, code: "GB", premium: 56700 },
    { country: "Kenya", no_of_leads: 120, code: "KE", premium: 700000 },
    { country: "Zambia", no_of_leads: 45, code: "ZM", premium: 150000 },
    { country: "Uganda", no_of_leads: 7, code: "UG", premium: 16000 },
    { country: "Tanzania", no_of_leads: 3, code: "TZ", premium: 2000 },
  ];

  fetchBarChartData = () => {
    fetch(
      "https://portal.micglobalrisks.com:8082/leaderboard/api/ehs-monthly-sales"
    )
      .then((response) => response.json())
      .then((data) => {
        const amounts = data.map((item) => Math.round(item.amount));

        this.setState({ monthValues: amounts });
      });
  };

  fetchAchieved = () => {
    fetch(
      "https://portal.micglobalrisks.com:8082/leaderboard/api/individual-targets"
    )
      .then((response) => response.json())
      .then((data) => {
        const empID = data.map((item) => Math.round(item.empID));

        this.setState({ salesMembers: data });

        this.setState({ salesMemberPictures: empID });
      });
  };

  fetchTargets = () => {
    fetch("https://portal.micglobalrisks.com:8082/leaderboard/api/targets")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ targetTotal: data.targetAmount });

        this.setState({ targetAchieved: data.amountAchied });
      });
  };

  getData = () => {
    this.fetchAchieved();
    this.fetchTargets();
    this.fetchBarChartData();
  };

  componentDidMount() {
    this.setState({ loaded: true });

    this.getData();

    // // repeat with the interval of 30 minutes
    setInterval(() => {
      this.getData();
    }, 3600000);

    // // after 5 seconds stop
    // setTimeout(() => {
    //   clearInterval(timerId);
    //   alert("stop");
    // }, 5000);

    // setInterval(() => {}, 1800000);

    // setTimeout(() => {
    //   this.setState({ loaded: true });
    // }, 3000);
  }

  render() {
    return (
      <>
        {this.state.loaded ? (
          <div className="row">
            <div className="col-12">
              <div className="card">
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
                                  <td style={{ width: "150px" }}>
                                    {l.country}
                                  </td>
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
                          <h6>
                            <u>
                              Broker/Direct Overall Set Target for August 2021
                            </u>
                          </h6>
                          <h1 className="text-success ml-2 mb-0">
                            $&nbsp;
                            {separator(Math.round(this.state.targetTotal))}
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
                        <h1 className="text-success ml-2 mb-0">
                          $&nbsp;
                          {separator(Math.round(this.state.targetAchieved))}
                        </h1>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <h6>
                          <u>Pending</u>
                        </h6>
                        <h1 className="text-danger ml-2 mb-0 font-weight-medium">
                          $&nbsp;
                          {separator(
                            Math.round(
                              this.state.targetTotal - this.state.targetAchieved
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
                        <h1 className="text-success ml-2 mb-0 font-weight-medium">
                          <Counter start={0} end={remainingDays()} delay={10} />
                          &nbsp;Day{remainingDays() > 1 && "s"}
                        </h1>
                      </div>
                    </div>
                    <div className="row mt-5 mb-7">
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <h6>Closed business</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12 col-lg-12 col-md-12">
                        <Bar
                          height={220}
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
                      {this.state.salesMembers
                        .sort((a, b) => b.amount - a.amount)
                        .map((s, i) => (
                          <div className="preview-item border-bottom" key={i}>
                            <div className="preview-thumbnail">
                              <img
                                src={require(`../../assets/images/faces/${s.empID}.jpg`)}
                                alt="face"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="preview-item-content d-flex flex-grow">
                              <div className="flex-grow">
                                <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                  <h6 className="preview-subject">{s.name}</h6>
                                  <p className="text-success text-start font-weight-medium">
                                    +$&nbsp;
                                    {separator(
                                      // Math.round(percentage(s.target, p.achieved))
                                      Math.round(s.amount)
                                    )}
                                  </p>
                                  {s.amount > s.target ? (
                                    <p className="text-success text-start font-weight-medium">
                                      +$&nbsp;
                                      {separator(
                                        Math.round(s.amount) - s.target
                                      )}
                                    </p>
                                  ) : (
                                    <p className="text-danger text-start font-weight-medium">
                                      -$&nbsp;
                                      {separator(
                                        s.target - Math.round(s.amount)
                                      )}
                                    </p>
                                  )}
                                </div>
                                <p className="text-muted">
                                  $&nbsp;{separator(s.target)}
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
        ) : (
          <>Loading please wait</>
        )}
      </>
    );
  }
}

export default Dashboard;
