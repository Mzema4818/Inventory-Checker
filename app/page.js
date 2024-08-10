'use client'
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Box, Typography, Modal, Stack, TextField, Button } from '@mui/material';
import { collection, query, getDocs, getDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

export default function Home() {
    const [inventory, setInventory] = useState([]);
    const [open, setOpen] = useState(true);
    const [itemName, setItemName] = useState('');

    const updateInventory = async () => {
        const snapshot = query(collection(firestore, 'inventory'));
        const docs = await getDocs(snapshot);
        const inventoryList = [];
        docs.forEach((doc) => {
            inventoryList.push({
                name: doc.id,
                ...doc.data(),
            });
        });
        setInventory(inventoryList);
    };

    const addItem = async (item) => {
        const docRef = doc(collection(firestore, 'inventory'), item);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const { quantity } = docSnap.data();
            await setDoc(docRef, { quantity: quantity + 1 });
        } else {
            await setDoc(docRef, { quantity: 1 });
        }

        await updateInventory();
    };

    const removeItem = async (item) => {
        const docRef = doc(collection(firestore, 'inventory'), item);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const { quantity } = docSnap.data();
            if (quantity === 1) {
                await deleteDoc(docRef);
            } else {
                await setDoc(docRef, { quantity: quantity - 1 });
            }
        }

        await updateInventory();
    };

    useEffect(() => {
        updateInventory();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box className="centeredContent">
            <Modal open={open} onClose={handleClose}>
                <Box className="modalBox">
                    <Typography variant="h6">Add Item</Typography>
                    <Stack width="100%" direction="row" spacing={2}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            sx={{ bgcolor: "#FFFFFF", color: "#333" }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                addItem(itemName);
                                setItemName('');
                                handleClose();
                            }}
                            className="addButton"
                        >
                            Add
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            <Button 
                variant="contained"
                onClick={handleOpen}
            >
                Add New Item
            </Button>
            <Box border="1px solid #333">
                <Box className="headerBox">
                    <Typography variant="h2" className="headerText">
                        Inventory
                    </Typography>
                </Box>
            </Box>
            <Stack width="800px" height="300px" spacing={2} overflow="auto" className="centeredBox">
                {inventory.map(({ name, quantity }) => (
                    <Box
                        key={name}
                        className="itemBox"
                    >
                        <Typography variant="h3" className="itemText">
                            {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Typography>
                        <Typography variant="h3" className="itemText">
                            {quantity}
                        </Typography>
                        <Button variant="contained" onClick={() => removeItem(name)}>
                            Remove
                        </Button>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}
