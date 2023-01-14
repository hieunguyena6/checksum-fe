import React, { useMemo, useState } from "react";
import { Button, Col, Typography, Card, Upload, Alert, notification } from "antd";
import crypto from "crypto-js";
import { getFileByChecksum } from "../utils/service";
import dayjs from "dayjs";

export default function CheckFile() {
  // const [fileCheckChecksum, setFileCheckChecksum] = useState(null);
  const [fileFetchingDetails, setFileFetchingDetails] = useState({
    isFetching: false,
    isFetched: null,
    data: null
  });

  const handleCheckFile = (info) => {
    const file = info.file;
    const reader = new FileReader();
    setFileFetchingDetails({
      isFetching: true,
      isFetched: false,
      data: null
    })
    reader.onload = async function (event) {
      const binary = event.target.result;
      const md5 = crypto.MD5(binary).toString();
      try {
        const response = await getFileByChecksum(md5);
        setFileFetchingDetails({
          isFetching: false,
          isFetched: true,
          data: response.data?.data
        })
      } catch (error) {
        notification.error({
          message: 'Check failed! Please try again later'
        })
        setFileFetchingDetails({
          isFetching: false,
          isFetched: true,
          data: null
        })
      }
    };
    reader.readAsBinaryString(file);
  };

  const renderFileCheckResult = useMemo(() => {
    if (fileFetchingDetails.isFetching) return 'Loading...'
    if (fileFetchingDetails.isFetched) {
      const fileData = fileFetchingDetails.data;
      if (!fileData) {
        return `This file's fingerprinted haven't uploaded to the server before yet !`;
      } else {
        return (
          <>
            <Typography.Title level={5}>
              File's fingerprinted uploaded information:
            </Typography.Title>
            <p>File name: {fileData.fileName}</p>
            <p>Checksum: {fileData.checksum}</p>
            <p>Upload by: {fileData.createBy?.userName}</p>
            <p>
              Time upload:{" "}
              {dayjs(fileData.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </>
        );
      }
    }
  }, [fileFetchingDetails]);

  return (
    <Col xl={12} xs={24} style={{ textAlign: "center" }}>
      <Card>
        <Typography.Title level={3}>
          Check file's fingerprinted
        </Typography.Title>
        <Upload.Dragger
          name="check-file"
          onChange={handleCheckFile}
          showUploadList={false}
          beforeUpload={() => false}
        >
          <p className="ant-upload-drag-icon">
            <Button>Upload</Button>
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Upload.Dragger>
        <br />
        <br />
        <Alert message={renderFileCheckResult} />
      </Card>
    </Col>
  );
}
