<template>
    <div>
      <h1>Item admin view Page</h1>
      <p>Welcome to the Item admin page!</p>
     
      <div v-if="storeStore.item">
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="storeStore.item.item.name">
        <label for="descripcion">Descripcion:</label>
        <input type="text" v-model="storeStore.item.item.description">
        <label for="price">Price:</label>
        <input type="number" v-model="storeStore.item.item.price">

        <!-- Image Upload Section -->
        <div class="image-upload-section">
          <h3>Upload Images</h3>
          
          <!-- Single file input -->
          <div>
            <input type="file" @change="handleFileSelect" accept="image/*" ref="fileInput">
            <button @click="uploadImage" :disabled="!selectedFile || uploading">
              {{ uploading ? 'Uploading...' : 'Upload Image' }}
            </button>
          </div>

          <!-- Show selected file info -->
          <div v-if="selectedFile" class="selected-file-info">
            <p>Selected: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})</p>
          </div>

          <!-- Upload message -->
          <div v-if="uploadMessage" class="upload-message" :class="uploadMessageType">
            {{ uploadMessage }}
          </div>
          
          <!-- Display current images -->
          <div v-if="storeStore.item.item.images && storeStore.item.item.images.length > 0" class="current-images">
            <h4>Current Images:</h4>
            <div class="image-grid">
              <div v-for="image in storeStore.item.item.images" :key="image.id" class="image-item">
                <img :src="`http://localhost:5000${image.url}`" :alt="image.filename" class="item-image">
                <div class="image-controls">
                  <span v-if="image.is_primary" class="primary-badge">Primary</span>
                  <button v-else @click="setPrimary(image.id)" class="btn-small">Set Primary</button>
                  <button @click="deleteImage(image.id)" class="btn-delete">Delete</button>
                </div>
                <p class="image-filename">{{ image.filename }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button @click="updateItem" class="btn-primary">Actualizar</button>
        <button @click="deleteItem" class="btn-danger">Eliminar Item</button>
      </div>
    </div>
</template>

<script>
import { usestoreStore } from '@/stores/storeStore';
import { cartStore } from '@/stores/cartStore';

export default {
  data() {
    return {
      storeStore: usestoreStore(),
      cartStorefunction: cartStore(),
      itemName: null,
      itemDescription: null, 
      itemPrice: null,
      item: null,
      updatedItem: null,
      selectedFile: null,
      selectedFiles: [],
      itemImages: [],
      uploading: false,
      uploadMessage: '',
      uploadMessageType: 'success' // 'success', 'error', 'info'
    };
  },

  methods: {
    addItem(){
      console.log('add item')
      this.addIsVisible = !this.addIsVisible
    },
    
    updateItem(){
      console.log('updateItem', this.storeStore.item.item.name)
      console.log('updateItem', this.storeStore.item.item.description)
      console.log('updateItem', this.storeStore.item.item.price)
      const updatedItem = {
        id: this.$route.params.id,
        name: this.storeStore.item.item.name,
        description: this.storeStore.item.item.description,
        price: this.storeStore.item.item.price
      }
      console.log('updateItem()()()()', updatedItem)
      this.storeStore.updateItem(updatedItem)
    },
    
    deleteItem(){
      console.log('storeStore.item.item.id en el itemviewadmin', this.storeStore.item.item.id)
      this.storeStore.removeItem(this.storeStore.item.item.id)
      this.$router.back()
    },
    
    handleFileSelect(event) {
      this.selectedFile = event.target.files[0];
      console.log('Selected file:', this.selectedFile);
    },
    
    handleMultipleFiles(event) {
      this.selectedFiles = Array.from(event.target.files);
    },
    
    async uploadImage() {
      if (!this.selectedFile) {
        this.showMessage('Please select a file first', 'error');
        return;
      }

      this.uploading = true;
      console.log('Starting upload for item ID:', this.$route.params.id);

      try {
        const formData = new FormData();
        formData.append('image', this.selectedFile);
        
        const API_URL = "http://127.0.0.1:5000";
        const token = localStorage.getItem("jwt");
        
        console.log('Making request to:', `${API_URL}/item/${this.$route.params.id}/upload-image`);
        
        const response = await fetch(`${API_URL}/item/${this.$route.params.id}/upload-image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
        
        const result = await response.json();
        console.log('Upload response:', result);
        
        if (response.ok) {
          this.showMessage('Image uploaded successfully!', 'success');
          this.selectedFile = null;
          this.$refs.fileInput.value = '';
          // Refresh item data to show new image
          await this.storeStore.getItem(this.$route.params.id);
        } else {
          this.showMessage(result.error || 'Upload failed', 'error');
        }
      } catch (error) {
        console.error('Upload error:', error);
        this.showMessage('Upload failed: Network error', 'error');
      } finally {
        this.uploading = false;
      }
    },
    
    async setPrimary(imageId) {
      try {
        const API_URL = "http://127.0.0.1:5000";
        const token = localStorage.getItem("jwt");
        
        const response = await fetch(`${API_URL}/image/${imageId}/set-primary`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (response.ok) {
          this.showMessage('Primary image updated!', 'success');
          // Refresh item data
          await this.storeStore.getItem(this.$route.params.id);
        } else {
          this.showMessage(result.error || 'Failed to set primary image', 'error');
        }
      } catch (error) {
        console.error('Error setting primary image:', error);
        this.showMessage('Failed to set primary image', 'error');
      }
    },
    
    async deleteImage(imageId) {
      if (!confirm('Are you sure you want to delete this image?')) return;
      
      try {
        const API_URL = "http://127.0.0.1:5000";
        const token = localStorage.getItem("jwt");
        
        const response = await fetch(`${API_URL}/image/${imageId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const result = await response.json();
        
        if (response.ok) {
          this.showMessage('Image deleted successfully!', 'success');
          // Refresh item data
          await this.storeStore.getItem(this.$route.params.id);
        } else {
          this.showMessage(result.error || 'Failed to delete image', 'error');
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        this.showMessage('Failed to delete image', 'error');
      }
    },
    
    showMessage(message, type = 'info') {
      this.uploadMessage = message;
      this.uploadMessageType = type;
      
      // Clear message after 5 seconds
      setTimeout(() => {
        this.uploadMessage = '';
      }, 5000);
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
  },
  
  mounted(){
    console.log('mounted - this.$route.params.id', this.$route.params.id)
    this.storeStore.getItem(this.$route.params.id)
  }
};
</script>

<style scoped>
.image-upload-section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.selected-file-info {
  margin: 10px 0;
  padding: 8px;
  background: #e9ecef;
  border-radius: 4px;
  font-size: 0.9em;
}

.upload-message {
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

.upload-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.upload-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.upload-message.info {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.current-images {
  margin-top: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.image-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  background: white;
}

.item-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.image-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.primary-badge {
  background: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
}

.image-filename {
  font-size: 0.9em;
  color: #666;
  margin: 5px 0 0 0;
  word-break: break-word;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

/* Button Styles */
.btn-primary {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-danger {
  background: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-small {
  background: #17a2b8;
  color: white;
  padding: 4px 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8em;
}

.btn-small:hover {
  background: #138496;
}

.btn-delete {
  background: #dc3545;
  color: white;
  padding: 4px 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 0.8em;
}

.btn-delete:hover {
  background: #c82333;
}

.itemcards {
  border: 1px solid red;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.itemcard {
  border: 1px solid gray;
  border-radius: 2px;
  display: flex;
  width: fit-content;
}

/* Form styling */
label {
  display: block;
  margin: 10px 0 5px 0;
  font-weight: bold;
}

input[type="text"], input[type="number"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input[type="file"] {
  margin: 10px 0;
  padding: 8px;
}

button {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #28a745;
  color: white;
}

button:hover:not(:disabled) {
  background: #218838;
}

button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
</style>