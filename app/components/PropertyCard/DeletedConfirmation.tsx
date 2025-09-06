import { Button } from '@/components/ui/button';
import React from 'react';

type DeleteConfirmationProps = {
    name: string; 
    onConfirm: () => void; 
    onCancel: () => void;
};

export default function DeleteConfirmation({ name, onConfirm, onCancel }: DeleteConfirmationProps) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-96 text-center">
                <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete <span className="font-bold">{name}</span>?
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <Button variant="destructive" onClick={onConfirm}>
                        Yes, Delete
                    </Button>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
