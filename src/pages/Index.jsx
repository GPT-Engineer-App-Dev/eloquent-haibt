import React, { useState } from "react";

import { Box, Button, FormControl, FormLabel, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Link, Text, VStack, HStack, useToast } from "@chakra-ui/react";

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  const [projectIds, setProjectIds] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const toast = useToast();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;
      const rows = csvData.split("\n");
      const header = rows[0].split(",");
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        return header.reduce((obj, key, index) => {
          obj[key] = values[index];
          return obj;
        }, {});
      });

      const aiUpdateData = data.filter((row) => row.type === "ai_update");
      setCsvData(aiUpdateData);

      const uniqueProjectIds = [...new Set(aiUpdateData.map((row) => row.project_id))];
      setProjectIds(uniqueProjectIds);
      setSelectedProjectId(uniqueProjectIds[0] || "");
    };

    reader.onerror = (error) => {
      toast({
        title: "Error parsing CSV",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    };

    reader.readAsText(file);
  };

  const handleProjectChange = (event) => {
    setSelectedProjectId(event.target.value);
  };

  React.useEffect(() => {
    const filtered = csvData.filter((row) => row.project_id === selectedProjectId);
    setFilteredData(filtered);
  }, [csvData, selectedProjectId]);

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Upload CSV File</FormLabel>
          <Input type="file" accept=".csv" onChange={handleFileUpload} />
        </FormControl>

        {projectIds.length > 0 && (
          <FormControl>
            <FormLabel>Select Project</FormLabel>
            <Select value={selectedProjectId} onChange={handleProjectChange}>
              {projectIds.map((projectId) => (
                <option key={projectId} value={projectId}>
                  {projectId}
                </option>
              ))}
            </Select>
          </FormControl>
        )}

        {filteredData.length > 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Edit ID</Th>
                <Th>Commit SHA</Th>
                <Th>GitHub Commit Link</Th>
                <Th>Parsed Tags</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((row) => (
                <Tr key={row.edit_id}>
                  <Td>{row.edit_id}</Td>
                  <Td>{row.commit_sha}</Td>
                  <Td>
                    <Link href={`https://github.com/search?q=commit%3A${row.commit_sha}&type=commits`} isExternal>
                      View Commit
                    </Link>
                  </Td>
                  <Td>{row.tags?.coutput ? <pre>{JSON.stringify(row.tags.coutput, null, 2)}</pre> : <Text color="gray.500">No parsed tags available</Text>}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text>No data available for the selected project.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
