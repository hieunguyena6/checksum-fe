import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Typography,
  Card,
  Upload,
  Alert,
  notification,
} from "antd";
import crypto from "crypto-js";
import { useMutation } from "react-query";
import { createFileChecksum } from "../utils/service";

export default function FileRegister() {
  const [registerMessage, setRegisterMessage] = useState("");

  const createFileChecksumMutation = useMutation({
    mutationFn: createFileChecksum,
  });

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      handleLogout();
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "/auth";
  };

  const handleRegisterFileChange = (info) => {
    const file = info.file;
    const reader = new FileReader();

    reader.onload = async function (event) {
      const binary = event.target.result;
      const md5 = crypto.MD5(binary).toString();
      setRegisterMessage(`FingerPrinted of ${file.name}: ${md5}`);
      try {
        await createFileChecksumMutation.mutateAsync({
          fileName: file.name,
          checksum: md5,
        });
        notification.success({
          message: "Upload fingerprinted successfully !",
        });
      } catch (error) {
        notification.error({
          message: error.response?.data?.message,
        });
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <Col xl={12} xs={24} style={{ textAlign: "center" }}>
      <Card>
        <Typography.Title level={3}>
          Register file's fingerprinted
        </Typography.Title>
        <Upload.Dragger
          name="register-file"
          onChange={handleRegisterFileChange}
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
        <Alert message={registerMessage} />
      </Card>
    </Col>
  );
}
