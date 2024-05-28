import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, Font, StyleSheet } from '@react-pdf/renderer';

const Styles = StyleSheet.create({
headerView: {
  backgroundColor: "#2F2B52",
  width: "auto",
  height: "4%",
},
contentView: {
  width: "auto",
  height: "93%",
},
titleView: {
  width: "auto",
  height: "16%",
},
toolnameView: {
  width: "50%",
  height: "16%",
},
datetimeView: {
  width: "50%",
  height: "16%",
  marginLeft: "50%",
},
toolname: {
  display: "flex",
  fontSize: "20px",
  marginLeft: "18%",
  marginTop: "10%",
},
toolname1: {
  display: "flex",
  fontSize: "18px",
  marginLeft: "18%",
  marginTop: "15%",
  width: "100%",
},
date: {
  fontSize: "12px",
  marginTop: "4%",
  marginLeft: "55%",
},
time: {
  fontSize: "12px",
  marginTop: "7%",
  marginLeft: "55%",
},
inputView: {
  marginLeft: "8%",
  marginRight: "8%",
  backgroundColor: "#2F2B52",
  height: "10%",
  width: "84%",
},
inputvalueView: {
  width: "auto",
  height: "40%",
},
inputvalue: {
  marginLeft: "5%",
  marginTop: "3%",
  fontSize: "14px",
  color: "#ffff",
},
valuesView: {
  width: "auto",
  height: "100%",
},
fc: {
  fontSize: "11px",
  marginLeft: "5%",
  marginTop: "5%",
  color: "#ffff",
},
vc: {
  fontSize: "11px",
  marginLeft: "35%",
  marginTop: "-2.5%",
  color: "#ffff",
},
pp: {
  fontSize: "11px",
  marginLeft: "70%",
  marginTop: "-2.5%",
},
paraView: {
  marginLeft: "10%",
  marginRight: "12%",
  marginTop: "5%",
  width: "80%",
},
paragraph: {
  fontSize: "10px",
  lineHeight: "1.8px",
},
resultView: {
  marginTop: "3%",
  backgroundColor: "#EEEEEE",
  marginLeft: "12%",
  marginRight: "13%",
  height: "7%",
  borderRadius: "10px",
},
result: {
  fontSize: "14px",
  marginLeft: "10%",
  marginTop: "5%",
},
output: {
  fontSize: "24px",
  fontFamily: "Helvetica-Bold",
  marginLeft: "50%",
  marginTop: "-5%",
},
chartView: {},
chartdescView: {
  marginTop: "55%",
},
desc: {
  fontSize: "10px",
  marginLeft: "8%",
  marginRight: "8%",
  lineHeight: "1.8px",
},
footerView: {
  backgroundColor: "#4a4a4a",
  width: "auto",
  height: "3%",
},
footerpara: {
  color: "#ffff",
  fontSize: "9px",
  textAlign: "center",
  marginTop: "1.5%",
},

});

const Pdfcomp = ({currencySymbol, companyName, sumAmt, revenue, netProfitPercent}) => {
const [currentDateTime, setCurrentDateTime] = useState(new Date());
const [isClient,setIsClient]=useState(false);
useEffect(()=>{
  setIsClient(true);
},[]);

  useEffect(() => {
    // Update date and time every second
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString();
  const date = new Date(formattedDateTime);
  const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  //console.log(companyName);
  return (
    <>
        {isClient && (
          <PDFDownloadLink
            document={
              <Document>
        <Page>
          <View>
            <View style={Styles.headerView}></View>
            <View style={Styles.contentView}>
              <View style={Styles.titleView}>
                <View style={Styles.toolnameView}>
                  <Text style={Styles.toolname}>Net Profit Margin</Text>
                  <Text style={Styles.toolname1}>Company Name: {companyName}</Text>
                </View>
                <View style={Styles.datetimeView}>
                  <Text style={Styles.date}>Date: {new Date(formattedDateTime).toISOString().split('T')[0]}</Text>
  <Text style={Styles.time}>Time: {formattedTime}</Text>
                </View>
              </View>
              <View style={Styles.inputView}>
                <View style={Styles.inputvalueView}>
                  <Text style={Styles.inputvalue}>Input Values : </Text>
                </View>
                <View style={Styles.valuesView}>
                  <Text style={Styles.fc}>Revenue - {currencySymbol} {revenue}</Text>
                  <Text style={Styles.vc}>
                    Expenses - {currencySymbol} {sumAmt}
                    {/* {console.log(currencySymbol)} */}
                  </Text>
                  <Text style={Styles.pp}>{}</Text>
                </View>
              </View>
              <View style={Styles.paraView}>
                <Text style={Styles.paragraph}>
                Discover your business's profitability with our Net Profit Margin Calculator. Simply input net profit and total revenue to determine your margin percentage. Use these insights to optimize finances and drive growth.
                </Text>
              </View>
              <View style={Styles.resultView}>
                <Text style={Styles.result}>Your Net Profit is:</Text>
                <Text style={Styles.output}>{netProfitPercent} (%)</Text>
              </View>
              <View style={Styles.chartView}>
                {/* <LinearChart
                  fixedCost={fixedCost}
                  totalCost={totalCost}
                  salesRevenue={salesRevenue}
                /> */}
              </View>
              {/* <View style={Styles.chartdescView}>
                <Text style={Styles.desc}>
                  Thus, the graph shows breakeven point for the given value, The
                  point where Sales Revenue and Total Cost meet is called as
                  breakeven point. Fixed Cost Remains Same.
                </Text>
              </View> */}
            </View>
            <View style={Styles.footerView}>
              <Text style={Styles.footerpara}>
                This document generate by 72business Tools product @ NPM
              </Text>
            </View>
          </View>
        </Page>
      </Document>
            }
            fileName="NetProfit_report.pdf"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "hsl(166,75%,37%)",
              
            }}
          >
          Download
          </PDFDownloadLink>
        )}

    </>
  );
};

export default Pdfcomp;